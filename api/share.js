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

  const id = Math.random().toString(36).substring(2, 10);
  const blobHost = process.env.BLOB_HOST;
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!blobHost || !token) {
    console.error('Missing BLOB_HOST or BLOB_READ_WRITE_TOKEN');
    return res.status(500).end('Server configuration error');
  }

  const blobUrl = `${blobHost}/${id}.html`;
  const apiRes = await fetch(blobUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'text/html',
    },
    body: content,
  });

  if (!apiRes.ok) {
    const errText = await apiRes.text();
    console.error('Blob PUT error:', apiRes.status, errText);
    return res.status(500).end('Blob upload failed');
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ id }));
};
