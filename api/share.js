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

  // Отправляем ТЕКСТ НАПРЯМУЮ, без { value: ... }
  const apiRes = await fetch(`${process.env.KV_REST_API_URL}/set/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.KV_REST_API_TOKEN}`,
      'Content-Type': 'text/plain'
    },
    body: content // ← просто строка
  });

  if (!apiRes.ok) {
    return res.status(500).end('Upstash error');
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ id }));
};
