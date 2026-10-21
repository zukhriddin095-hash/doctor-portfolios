import { z } from 'zod';

export function normalizePhone(v: string): string | null {
  const d = v.replace(/\D/g, '');
  if (d.length === 9) return `+998${d}`;
  if (d.length === 12 && d.startsWith('998')) return `+${d}`;
  return null;
}
type Msg = Record<string, string>;
export const appointmentSchema = (m: Msg) =>
  z.object({
    name: z.string().trim().min(2, m.name).max(80, m.name),
    phone: z.string().refine((v) => normalizePhone(v) !== null, m.phone),
    message: z.string().trim().max(1000),
    consent: z.boolean().refine((v) => v, m.consent),
    website: z.string().max(0).optional(), // honeypot
  });
export const reviewSchema = (m: Msg) =>
  z.object({
    name: z.string().trim().min(2, m.name).max(80, m.name),
    rating: z.string().regex(/^[1-5]$/, m.rating),
    text: z.string().trim().min(10, m.text).max(1000, m.text),
    website: z.string().max(0).optional(), // honeypot
  });
export type AppointmentValues = z.infer<ReturnType<typeof appointmentSchema>>;
export type ReviewValues = z.infer<ReturnType<typeof reviewSchema>>;
export type PublicReview = { id: string; name: string; rating: number; text: string; created_at: string };
