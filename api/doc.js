// @ts-nocheck
module.exports = async (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const id = url.searchParams.get('id');

  if (!id) {
    res.statusCode = 400;
    return res.end('Missing id');
  }

  const blobHost = process.env.BLOB_HOST;
  if (!blobHost) {
    res.statusCode = 500;
    return res.end('Missing blob host');
  }

  const blobUrl = `${blobHost}/${id}.html`;

  const apiRes = await fetch(blobUrl);

  if (apiRes.status === 404) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  if (!apiRes.ok) {
    res.statusCode = 500;
    return res.end('Blob fetch error');
  }

  let content = await apiRes.text();

  // Если содержимое равно "null" или пустое, заменяем на пустую строку
  if (content === 'null' || content === '') {
    content = '';
  }

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
      <title>Blokknote — Shared</title>
      <style>body{background:#f9f9f7;color:#000;font-family:system-ui;padding:24px;margin:0;line-height:1.6}@media(max-width:500px){body{padding:16px}}</style>
    </head>
    <body>${content}</body>
    </html>
  `);
};
