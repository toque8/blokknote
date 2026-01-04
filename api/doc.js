// @ts-nocheck
module.exports = async (req, res) => {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const id = url.searchParams.get('id');

  if (!id) {
    res.statusCode = 400;
    return res.end('Missing id');
  }

  const apiRes = await fetch(`${process.env.KV_REST_API_URL}/get/${id}`, {
    headers: {
      'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`
    }
  });

  if (!apiRes.ok) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  let content = '';
  try {
    const data = await apiRes.json();
    content = data.result || '';
  } catch (e) {
    // fallback: если вдруг вернулась чистая строка
    content = await apiRes.text();
    if (content === 'null') content = '';
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
