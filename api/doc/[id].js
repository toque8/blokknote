// api/doc/[id].js
export default async function handler(request, { params }) {
  try {
    const id = params.id;
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/get/${id}`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`
      }
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
        <style>
          body {
            background: #f9f9f7;
            color: black;
            font-family: system-ui, sans-serif;
            padding: 24px;
            margin: 0;
            line-height: 1.6;
          }
          @media (max-width: 500px) {
            body { padding: 16px; }
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  } catch (e) {
    return new Response('Error', { status: 500 });
  }
}
