import { createHash } from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;
const API_VERSION = 'v21.0';

const sha256 = (v: string) => createHash('sha256').update(v.trim().toLowerCase()).digest('hex');

type PurchaseInput = {
  eventId: string;
  eventSourceUrl: string;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  value: number;
  currency: string;
  contentName?: string;
  contentIds?: string[];
  numItems?: number;
};

const normalizePhone = (p: string) => p.replace(/\D/g, '');

export async function sendPurchaseEvent(input: PurchaseInput) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn('[CAPI] PIXEL_ID or ACCESS_TOKEN missing — skipping');
    return { skipped: true };
  }

  const userData: Record<string, string | string[]> = {};
  if (input.email) userData.em = sha256(input.email);
  if (input.phone) userData.ph = sha256(normalizePhone(input.phone));
  if (input.firstName) userData.fn = sha256(input.firstName);
  if (input.lastName) userData.ln = sha256(input.lastName);
  if (input.city) userData.ct = sha256(input.city);
  if (input.postalCode) userData.zp = sha256(input.postalCode);
  if (input.country) userData.country = sha256(input.country);
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: 'website',
        event_source_url: input.eventSourceUrl,
        user_data: userData,
        custom_data: {
          currency: input.currency,
          value: input.value,
          ...(input.contentName ? { content_name: input.contentName } : {}),
          ...(input.contentIds ? { content_ids: input.contentIds } : {}),
          ...(input.numItems ? { num_items: input.numItems } : {}),
          content_type: 'product',
        },
      },
    ],
    ...(TEST_EVENT_CODE ? { test_event_code: TEST_EVENT_CODE } : {}),
  };

  const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error('[CAPI] Purchase send failed:', json);
      return { ok: false, error: json };
    }
    console.log('[CAPI] Purchase sent:', { eventId: input.eventId, fbtrace: json.fbtrace_id });
    return { ok: true, response: json };
  } catch (err) {
    console.error('[CAPI] Fetch error:', err);
    return { ok: false, error: String(err) };
  }
}
