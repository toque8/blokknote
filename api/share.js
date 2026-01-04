// api/share.js
export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { content } = await request.json(); 
    if (!content || typeof content !== 'string') {
      return new Response('Invalid content', { status: 400 });
    }

    const id = Math.random().toString(36).substring(2, 10);

    const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: content,
        ex: 604800
      })
    });

    if (!res.ok) {
      return new Response('Save failed', { status: 500 });
    }

    return new Response(JSON.stringify({ url: `/doc/${id}` }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response('Server error', { status: 500 });
  }
}
