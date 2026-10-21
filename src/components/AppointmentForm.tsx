'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useI18n } from './I18nProvider';
import { Reveal } from './motion';
import { appointmentSchema, type AppointmentValues } from '@/lib/schemas';

export function AppointmentForm() {
  const { t, locale } = useI18n();
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'fail'>('idle');
  const schema = useMemo(() => appointmentSchema({ name: t.en, phone: t.ep, consent: t.ec }), [t]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AppointmentValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', message: '', consent: false, website: '' },
  });
  const onSubmit = async (v: AppointmentValues) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...v, locale }) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('ok');
      reset();
    } catch {
      setStatus('fail');
    }
  };
  return (
    <section id="appointment" className="ap">
      <div className="w two">
        <Reveal>
          <h2>{t.c1}</h2>
          <p className="m">{t.fp}</p>
          <p className="nt">{t.demo}</p>
          <Image className="clip" src="/images/clip.jpg" alt="" width={500} height={452} sizes="(max-width:900px) 100vw, 480px" />
        </Reveal>
        <Reveal>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register('website')} />
            <div>
              <label htmlFor="n">{t.fn}</label>
              <input id="n" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="en" {...register('name')} />
              <div className="er" id="en">{errors.name?.message}</div>
            </div>
            <div>
              <label htmlFor="p">{t.ft}</label>
              <input id="p" type="tel" autoComplete="tel" placeholder="+998 90 123 45 67" aria-invalid={!!errors.phone} aria-describedby="ep" {...register('phone')} />
              <div className="er" id="ep">{errors.phone?.message}</div>
            </div>
            <div>
              <label htmlFor="m">{t.fm}</label>
              <textarea id="m" {...register('message')} />
            </div>
            <div>
              <label className="ck"><input type="checkbox" id="c" aria-describedby="ec" {...register('consent')} /><span>{t.fc}</span></label>
              <div className="er" id="ec">{errors.consent?.message}</div>
            </div>
            <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? t.sending : t.fs}</button>
            <div className="nt" role="status" aria-live="polite" hidden={status === 'idle' || status === 'sending'}>
              {status === 'ok' && t.aok}{status === 'fail' && t.afail}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
