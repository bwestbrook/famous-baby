// famousBaby — Q&A worker
//
// Proxies `{ person, question }` from the front-end to Anthropic's Messages API
// and returns `{ answer }`. Holds the API key on the server so it never reaches
// the browser. Designed to run on Cloudflare Workers (free tier is plenty for
// this) but the only Cloudflare-specific thing here is `env.ANTHROPIC_API_KEY`
// being injected via secret binding — port to Vercel/Lambda by reading the key
// from a different source.

const CORS_HEADERS = {
  // Tighten this to your site origin in production, e.g.
  //   'Access-Control-Allow-Origin': 'https://famousbaby.app'
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_QUESTION_LENGTH = 500;
const MAX_TOKENS = 350;

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }
    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: 'Server is missing ANTHROPIC_API_KEY' }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON body' }, 400);
    }

    const { person, question } = body || {};
    if (!person || typeof person !== 'object') {
      return json({ error: 'Missing `person` object' }, 400);
    }
    if (typeof question !== 'string' || !question.trim()) {
      return json({ error: 'Missing `question` string' }, 400);
    }
    if (question.length > MAX_QUESTION_LENGTH) {
      return json(
        { error: `Question too long (max ${MAX_QUESTION_LENGTH} chars)` },
        400,
      );
    }

    const systemPrompt = buildSystemPrompt(person);

    try {
      const upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: systemPrompt,
          messages: [{ role: 'user', content: question.trim() }],
        }),
      });

      if (!upstream.ok) {
        // Don't leak Anthropic's error body to clients; log it server-side.
        const txt = await upstream.text();
        console.error('anthropic_error', upstream.status, txt);
        return json({ error: 'The model could not answer right now.' }, 502);
      }

      const data = await upstream.json();
      const answer = data?.content?.[0]?.text?.trim() || '(no answer returned)';

      return json({ answer });
    } catch (err) {
      console.error('worker_error', err);
      return json({ error: 'Network error reaching the model.' }, 502);
    }
  },
};

function buildSystemPrompt(person) {
  const lines = [
    'You are an editor for famousBaby, a website that helps parents discover names by browsing famous people.',
    `You will answer questions about ONE person: ${person.name || '(unknown)'}.`,
  ];
  if (person.field) lines.push(`Field: ${person.field}${person.subfield ? ' / ' + person.subfield : ''}.`);
  if (person.birthYear) lines.push(`Born: ${person.birthYear}${person.birthPlace ? ', ' + person.birthPlace : ''}.`);
  if (person.bio) lines.push(`Editorial bio: ${person.bio}`);
  lines.push(
    '',
    'Rules:',
    '- Answer in 1–3 sentences. No bullets, no headers.',
    '- Only answer questions about this specific person. If the user asks about anything else, politely redirect.',
    '- If you are not confident about a fact, say so explicitly rather than inventing it. It is better to admit uncertainty.',
    '- Do not include the person\'s full birth date, home address, or any unpublished personal information.',
    '- Keep tone editorial and warm, not encyclopedic.',
  );
  return lines.join('\n');
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}
