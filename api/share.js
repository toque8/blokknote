export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { content } = await req.json();
  if (!content) {
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
    return new Response('Failed to save', { status: 500 });
  }

  return new Response(JSON.stringify({ url: `/doc/${id}` }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
