// Receives a signup from our own form and passes it to Kit.
// The API key lives in environment variables and never reaches the browser.

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });

const looksLikeEmail = (value: string) =>
  value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const sameOrigin = (req: Request) => {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
};

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return json({ ok: false, message: 'Method not allowed.' }, 405);
  }
  if (!sameOrigin(req)) {
    return json({ ok: false, message: 'Request not allowed.' }, 403);
  }

  let payload: { email?: unknown; website?: unknown } | null = null;
  try {
    const text = await req.text();
    if (text.length > 2000) throw new Error('Body too large');
    payload = JSON.parse(text);
  } catch {
    return json({ ok: false, message: 'Please try again.' }, 400);
  }
  if (!payload || typeof payload !== 'object') {
    return json({ ok: false, message: 'Please try again.' }, 400);
  }

  // Spam trap: real people never fill the hidden field. Bots often do.
  // We answer as if it worked, so bots learn nothing.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return json({ ok: true, message: 'Almost done! Check your inbox.' });
  }

  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  if (!looksLikeEmail(email)) {
    return json({ ok: false, message: 'Please enter a valid email address.' }, 400);
  }

  const apiKey = process.env.KIT_API_KEY;
  const formId = process.env.KIT_FORM_ID;
  if (!apiKey || !formId) {
    console.error('Signup is not configured: KIT_API_KEY or KIT_FORM_ID is missing.');
    return json(
      { ok: false, message: 'Signup is temporarily unavailable. Please try again later.' },
      500,
    );
  }

  try {
    const response = await fetch(
      `https://api.kit.com/v4/forms/${encodeURIComponent(formId)}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': apiKey,
        },
        body: JSON.stringify({ email_address: email }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!response.ok) {
      console.error(`Kit returned status ${response.status}`);
      return json(
        { ok: false, message: 'We could not add you just now. Please try again later.' },
        502,
      );
    }
  } catch {
    console.error('The request to Kit failed.');
    return json(
      { ok: false, message: 'We could not add you just now. Please try again later.' },
      502,
    );
  }

  // The same message for new and existing subscribers, so nobody can use
  // this form to find out whether an address is already on the list.
  return json({
    ok: true,
    message: 'Almost done! Check your inbox and click the confirmation link.',
  });
};