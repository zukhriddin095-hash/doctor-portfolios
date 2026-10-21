import 'server-only';
import type { PublicReview } from './schemas';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const dbConfigured = () => Boolean(url && key);

async function rest(path: string, init: RequestInit & { next?: { revalidate?: number } } = {}) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: key!, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...init.headers },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res;
}

export async function getApprovedReviews(): Promise<PublicReview[]> {
  if (!dbConfigured()) return [];
  try {
    const res = await rest('reviews?select=id,name,rating,text,created_at&approved=eq.true&order=created_at.desc&limit=50', {
      next: { revalidate: 60 },
    });
    return (await res.json()) as PublicReview[];
  } catch (e) {
    console.error('getApprovedReviews failed', e);
    return [];
  }
}
export async function insertRow(table: 'reviews' | 'appointments', row: Record<string, unknown>) {
  await rest(table, { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(row) });
}
