/**
 * Lead intake Lambda (scaffold, NOT deployed).
 * TODO: deploy as a Lambda Function URL (or behind API Gateway), then set PUBLIC_LEAD_ENDPOINT to its URL.
 *
 * Flow: website form → this handler → GoHighLevel (upsert contact + tags) → GHL workflow fires the
 * instant text-back / playbook email / nurture sequence.
 *
 * Env vars:
 *   GHL_API_TOKEN     Private Integration token for the GHL sub-account (store in Secrets Manager / SSM in production)
 *   GHL_LOCATION_ID   The sub-account (location) id
 *   ALLOWED_ORIGIN    https://palmbeachaiservices.com
 *
 * Runtime: Node.js 20+ (global fetch). No dependencies.
 */
const GHL = 'https://services.leadconnectorhq.com';
const ORIGIN = process.env.ALLOWED_ORIGIN ?? 'https://palmbeachaiservices.com';

const cors = {
  'Access-Control-Allow-Origin': ORIGIN,
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};
const reply = (statusCode, body) => ({ statusCode, headers: { 'content-type': 'application/json', ...cors }, body: JSON.stringify(body) });

const clean = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : undefined);
const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const digits = (v) => (typeof v === 'string' ? v.replace(/\D/g, '') : '');

export const handler = async (event) => {
  const method = event.requestContext?.http?.method ?? event.httpMethod;
  if (method === 'OPTIONS') return { statusCode: 204, headers: cors };
  if (method !== 'POST') return reply(405, { error: 'method_not_allowed' });

  let data;
  try {
    data = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body ?? '{}');
  } catch {
    return reply(400, { error: 'bad_json' });
  }

  // Honeypot: pretend success so bots learn nothing
  if (data.company_website) return reply(200, { ok: true });

  const source = data.source === 'website-playbook' ? 'website-playbook' : 'website-teardown';
  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const phoneDigits = digits(data.phone);
  if (!name || !isEmail(email)) return reply(422, { error: 'name_and_email_required' });
  if (source === 'website-teardown' && phoneDigits.length < 10) return reply(422, { error: 'phone_required' });
  // TODO: verify a Cloudflare Turnstile token here if spam shows up.

  const [firstName, ...rest] = name.split(/\s+/);
  const phone = phoneDigits ? `+1${phoneDigits.slice(-10)}` : undefined;
  const tags = [source, data.trade && `trade:${clean(data.trade, 60)}`, data.town && `town:${clean(data.town, 60)}`, data.plan && `plan:${clean(data.plan, 40)}`,
    data.smsConsentTransactional ? 'sms-consent-transactional' : null, data.smsConsentMarketing ? 'sms-consent-marketing' : null].filter(Boolean);

  const contact = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName,
    lastName: rest.join(' ') || undefined,
    name,
    email,
    phone,
    companyName: clean(data.business, 160),
    website: clean(data.website, 300),
    source: `palmbeachaiservices.com (${source})`,
    tags,
    // TODO: map these to GHL custom field ids once they exist in the sub-account.
    // customFields: [{ id: '<revenueBandFieldId>', value: data.revenueBand }, ...]
  };

  try {
    const res = await fetch(`${GHL}/contacts/upsert`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
        Version: '2021-07-28',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(contact),
    });
    if (!res.ok) {
      console.error('GHL upsert failed', res.status, await res.text());
      return reply(502, { error: 'crm_error' });
    }
    // Keep a record of the exact consent language the person saw (A2P / TCPA evidence).
    console.log(JSON.stringify({ event: 'lead', source, email, phone, consentText: data.consentText, smsConsentTransactional: !!data.smsConsentTransactional, smsConsentMarketing: !!data.smsConsentMarketing, page: data.page, utm: data.utm, at: data.submittedAt }));
    // TODO: optionally create an opportunity in the pipeline and/or send an SES alert email to Gino.
    return reply(200, { ok: true });
  } catch (err) {
    console.error(err);
    return reply(502, { error: 'crm_unreachable' });
  }
};
