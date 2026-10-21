import 'server-only';
// Best-effort, per-instance limiter. On serverless it resets on cold starts;
// use Upstash/Turnstile for hard guarantees in production.
const hits = new Map<string, number[]>();
export function limited(ip: string, bucket: string, max = 3, windowMs = 10 * 60_000): boolean {
  const k = `${bucket}:${ip}`;
  const now = Date.now();
  const arr = (hits.get(k) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) { hits.set(k, arr); return true; }
  arr.push(now); hits.set(k, arr);
  return false;
}
export const clientIp = (req: Request) => req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
