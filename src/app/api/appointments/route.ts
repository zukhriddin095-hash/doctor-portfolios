import { NextResponse } from 'next/server';
import { appointmentSchema, normalizePhone } from '@/lib/schemas';
import { dbConfigured, insertRow } from '@/lib/supabase';
import { notifyTelegram, telegramConfigured } from '@/lib/telegram';
import { clientIp, limited } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!dbConfigured() && !telegramConfigured()) return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  if (limited(clientIp(req), 'appt')) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  const body = await req.json().catch(() => null);
  const parsed = appointmentSchema({ name: 'name', phone: 'phone', consent: 'consent' }).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const phone = normalizePhone(parsed.data.phone)!;
  const locale = typeof body?.locale === 'string' ? body.locale.slice(0, 5) : null;
  let saved = false;
  if (dbConfigured()) {
    try { await insertRow('appointments', { name: parsed.data.name, phone, message: parsed.data.message || null, locale }); saved = true; }
    catch (e) { console.error(e); }
  }
  const sent = await notifyTelegram(`Yangi ariza / Новая заявка\n${parsed.data.name}\n${phone}\n${parsed.data.message || '-'}`);
  if (!saved && !sent) return NextResponse.json({ error: 'failed' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
