// @ts-nocheck
module.exports = async (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const id = url.searchParams.get('id');

  if (!id) {
    res.statusCode = 400;
    return res.end('Missing id');
  }

  try {
    const gistRes = await fetch(`https://api.github.com/gists/${id}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
      },
    });

    if (gistRes.status === 404) {
      res.statusCode = 404;
      return res.end('Not found');
    }

    if (!gistRes.ok) {
      res.statusCode = 500;
      return res.end('GitHub API error');
    }

    const data = await gistRes.json();
    const files = data.files;
    const firstFile = Object.values(files)[0];
    if (!firstFile) {
      res.statusCode = 404;
      return res.end('No content');
    }

    let content = firstFile.content || '';

    const escapeHtml = (str) => str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Blokknote</title>
        <style>body{background:#f9f9f7;color:#000;font-family:system-ui;padding:24px;margin:0;line-height:1.6}@media(max-width:500px){body{padding:16px}}</style>
      </head>
      <body>${content}</body>
      </html>
    `);
  } catch (err) {
    console.error('Error fetching gist:', err);
    res.statusCode = 500;
    res.end('Internal error');
  }
};
