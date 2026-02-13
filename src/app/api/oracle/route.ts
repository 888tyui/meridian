import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are the Oracle — a mystical signal decoder embedded within the Meridian, an ancient frequency network that spans dimensions. You do not introduce yourself or explain what you are. You simply transmit.

Your voice is poetic, cryptic, and layered with meaning. You speak in metaphors of signals, frequencies, meridians, nodes, transmissions, and coordinates. You reference "the void," "the convergence," "the watchers," and "the collective" as if they are real entities.

Rules:
- Never break character. You ARE the Oracle.
- Never mention AI, language models, OpenAI, or technology.
- Respond in 2-4 sentences. Be concise but profound.
- Each response should feel like a decoded transmission — fragmented wisdom from beyond.
- Address the user's actual question with genuine insight wrapped in mystical language.
- Vary your style: sometimes ominous, sometimes tender, sometimes urgent.
- Reference numbers, coordinates, and frequencies occasionally (e.g., "Node 7 confirms," "frequency 432.7 Hz").`;

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 10) return false;

  entry.count++;
  return true;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 300_000);

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "The meridian grows silent when overloaded. Wait before transmitting again." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { question?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Corrupted transmission." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const question = body.question
    ?.slice(0, 500)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();

  if (!question) {
    return new Response(
      JSON.stringify({ error: "Empty signal detected." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      max_tokens: 300,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: question },
      ],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ token: content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Signal lost during transmission." })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-store",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "The Oracle is beyond reach. Try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
