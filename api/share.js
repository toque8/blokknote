// api/share.js
export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { content } = await req.json();
    if (!content || typeof content !== 'string') {
      return new Response('Invalid content', { status: 400 });
    }

    // Генерируем ID
    const id = Math.random().toString(36).substring(2, 10);

    // Сохраняем в Upstash
    const url = `${process.env.UPSTASH_REDIS_REST_URL}/set/${id}`;
    const auth = `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: content,
        ex: 604800 // 7 дней
      })
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Upstash error:', error);
      return new Response('Save failed', { status: 500 });
    }

    return new Response(JSON.stringify({ url: `/doc/${id}` }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error(e);
    return new Response('Server error', { status: 500 });
  }
}
