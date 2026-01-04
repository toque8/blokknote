export async function GET(request, { params }) {
  const id = params.id;

  const res = await fetch(`${process.env.KV_REST_API_URL}/get/${id}`, {
    headers: { 'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}` }
  });

  if (!res.ok) {
    return new Response('Not found', { status: 404 });
  }

  const content = await res.text();
  if (content === 'null') {
    return new Response('Not found', { status: 404 });
  }

  return new Response(`
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
  `, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}