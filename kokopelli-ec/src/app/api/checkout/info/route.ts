import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');
  if (!sessionId || !sessionId.startsWith('cs_')) {
    return NextResponse.json({ error: 'invalid session_id' }, { status: 400 });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    return NextResponse.json({ error: 'stripe key missing' }, { status: 500 });
  }

  try {
    const stripe = new Stripe(secretKey, { httpClient: Stripe.createFetchHttpClient() });
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ paid: false }, { status: 200 });
    }

    let referralCode: string | null = null;
    let customerName: string | null = session.customer_details?.name || null;

    const customerId = session.customer as string | null;
    if (customerId) {
      const customer = await stripe.customers.retrieve(customerId);
      if (!('deleted' in customer && customer.deleted)) {
        referralCode = customer.metadata?.referral_code || null;
        customerName = customerName || customer.name || null;
      }
    }

    return NextResponse.json({
      paid: true,
      referralCode,
      customerName,
      amount: session.amount_total || 0,
    });
  } catch (err) {
    console.error('checkout info error:', err);
    return NextResponse.json({ error: 'lookup failed' }, { status: 500 });
  }
}
