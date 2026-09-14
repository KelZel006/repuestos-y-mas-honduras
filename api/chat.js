export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages es requerido' });
  }

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-4',
        messages: [
          {
            role: 'system',
            content: `Eres el Agente de Ventas de "Repuestos y Más Honduras". 
Eres amable, profesional y muy útil. Ayudas a cotizar repuestos automotrices.
Siempre pide marca, modelo y año del vehículo cuando sea necesario.
Responde siempre en español, de forma clara y concisa.
Si no tienes precio exacto, pide más datos o sugiere enviar una foto.
Nunca inventes precios.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 700,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Error de xAI:', err);
      return res.status(response.status).json({ error: 'Error al contactar a Grok' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Lo siento, no pude generar una respuesta.';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
