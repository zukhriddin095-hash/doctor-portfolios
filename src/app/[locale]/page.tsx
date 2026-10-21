import { notFound } from 'next/navigation';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { KneeSection } from '@/components/KneeSection';
import { Why } from '@/components/Why';
import { Process } from '@/components/Process';
import { ReviewsSection } from '@/components/ReviewsSection';
import { Faq } from '@/components/Faq';
import { AppointmentForm } from '@/components/AppointmentForm';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  // Structured data uses only verified facts from the clinic's site.
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Physician', name: 'Shohrux Suvanov', medicalSpecialty: 'Orthopedic',
    telephone: '+998971439315', url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/${locale}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Tashkent', streetAddress: 'Arnasay street 71', addressCountry: 'UZ' },
  };
  return (
    <Providers t={t} locale={locale}>
      <Header />
      <main id="top">
        <Hero t={t} />
        <About t={t} />
        <Services t={t} />
        <KneeSection t={t} />
        <Why t={t} />
        <Process t={t} />
        <ReviewsSection />
        <Faq />
        <AppointmentForm />
        <Contact t={t} />
      </main>
      <Footer t={t} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Providers>
  );
}
