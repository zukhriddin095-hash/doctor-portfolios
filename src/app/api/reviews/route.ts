import { NextResponse } from 'next/server';
import { reviewSchema } from '@/lib/schemas';
import { dbConfigured, getApprovedReviews, insertRow } from '@/lib/supabase';
import { clientIp, limited } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ reviews: await getApprovedReviews() });
}

export async function POST(req: Request) {
  if (!dbConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  if (limited(clientIp(req), 'review')) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  const body = await req.json().catch(() => null);
  const parsed = reviewSchema({ name: 'name', rating: 'rating', text: 'text' }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true, published: false }); // bot: pretend success
  const published = process.env.REVIEWS_AUTO_APPROVE === 'true';
  try {
    await insertRow('reviews', {
      name: parsed.data.name,
      rating: Number(parsed.data.rating),
      text: parsed.data.text,
      locale: typeof body?.locale === 'string' ? body.locale.slice(0, 5) : null,
      approved: published,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'db' }, { status: 500 });
  }
  return NextResponse.json({ ok: true, published });
}
