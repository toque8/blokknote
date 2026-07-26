// @ts-nocheck
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  let content;
  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const body = Buffer.concat(buffers).toString();
    const json = JSON.parse(body);
    content = json.content;
  } catch (e) {
    return res.status(400).end('Invalid JSON');
  }

  if (!content) {
    return res.status(400).end('Invalid content');
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).end('GitHub token missing');
  }

  const id = Math.random().toString(36).substring(2, 10);
  const filename = `${id}.html`;

  try {
    const gistRes = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
      },
      body: JSON.stringify({
        description: `Blokknote share ${id}`,
        public: true,
        files: {
          [filename]: {
            content: content,
          },
        },
      }),
    });

    if (!gistRes.ok) {
      const err = await gistRes.text();
      console.error('GitHub Gist error:', gistRes.status, err);
      return res.status(500).end('GitHub API error');
    }

    const data = await gistRes.json();
    const gistId = data.id;

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ id: gistId }));
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).end('Internal error');
  }
};
