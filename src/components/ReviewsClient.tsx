'use client';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18n } from './I18nProvider';
import { Reveal } from './motion';
import { reviewSchema, type PublicReview, type ReviewValues } from '@/lib/schemas';
import { dateLocale } from '@/i18n/config';

type Status = 'idle' | 'sending' | 'pub' | 'pend' | 'fail';

export function ReviewsClient({ initial }: { initial: PublicReview[] }) {
  const { t, locale } = useI18n();
  const [list, setList] = useState(initial);
  const [status, setStatus] = useState<Status>('idle');
  const schema = useMemo(() => reviewSchema({ name: t.rer1, rating: t.rer2, text: t.rer3 }), [t]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReviewValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', rating: '', text: '', website: '' },
  });
  const fmt = new Intl.DateTimeFormat(dateLocale[locale], { dateStyle: 'medium', timeZone: 'Asia/Tashkent' });

  const onSubmit = async (v: ReviewValues) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...v, locale }) });
      if (!res.ok) throw new Error(String(res.status));
      const j = (await res.json()) as { published?: boolean };
      if (j.published) setList((p) => [{ id: crypto.randomUUID(), name: v.name, rating: Number(v.rating), text: v.text, created_at: new Date().toISOString() }, ...p]);
      setStatus(j.published ? 'pub' : 'pend');
      reset();
    } catch {
      setStatus('fail');
    }
  };

  return (
    <section id="reviews" className="alt">
      <div className="w two">
        <Reveal>
          <h2>{t.rh}</h2>
          <p className="m">{t.rp}</p>
          <div>
            {list.length === 0 && <p className="m">{t.re}</p>}
            {list.map((r) => (
              <div key={r.id} className="rc">
                <span className="st" role="img" aria-label={`${r.rating}/5`}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <b>{r.name}</b>
                <p style={{ margin: '6px 0 0' }}>{r.text}</p>
                <small className="m">{fmt.format(new Date(r.created_at))}</small>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <form className="rfm" noValidate onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('website')} />
            <div>
              <label htmlFor="rn">{t.fn}</label>
              <input id="rn" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="er1" {...register('name')} />
              <div className="er" id="er1">{errors.name?.message}</div>
            </div>
            <fieldset>
              <legend>{t.rs}</legend>
              <div className="stars">
                {[5, 4, 3, 2, 1].map((n) => (
                  <span key={n} style={{ display: 'contents' }}>
                    <input type="radio" id={`s${n}`} value={String(n)} {...register('rating')} />
                    <label htmlFor={`s${n}`} title={String(n)}>★</label>
                  </span>
                ))}
              </div>
              <div className="er" id="er2">{errors.rating?.message}</div>
            </fieldset>
            <div>
              <label htmlFor="rt">{t.rt}</label>
              <textarea id="rt" aria-invalid={!!errors.text} aria-describedby="er3" {...register('text')} />
              <div className="er" id="er3">{errors.text?.message}</div>
            </div>
            <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.rb}</button>
            <div className="nt" role="status" aria-live="polite" hidden={status === 'idle' || status === 'sending'}>
              {status === 'pub' && t.rpub}{status === 'pend' && t.rpend}{status === 'fail' && t.rfail}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
