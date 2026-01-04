export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: { 'Allow': 'POST' }
    });
  }

  try {
    const { content } = await req.json();
    
    if (!content || typeof content !== 'string') {
      return new Response('Invalid content', { status: 400 });
    }

    const id = Math.random().toString(36).substring(2, 10);

    const upstashResponse = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/set/${id}`, {
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

    if (!upstashResponse.ok) {
      return new Response('Failed to save to database', { status: 500 });
    }

    const shareUrl = `${req.headers.get('origin') || 'https://blokknote.vercel.app'}/doc/${id}`;
    
    return new Response(JSON.stringify({ 
      success: true, 
      url: shareUrl,
      id: id
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    return new Response('Internal server error', { status: 500 });
  }
}
