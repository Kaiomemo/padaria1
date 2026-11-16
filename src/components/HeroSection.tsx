import { ArrowDownRight, MessageCircle } from 'lucide-react';
import { HERO_IMAGE, buildWhatsAppUrl } from '../data/bakery';
import { SafeImage } from './SafeImage';

export function HeroSection() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá, Grande Família Alimentos! Quero saber o que está saindo quentinho do forno hoje.'
  );

  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-hairline bg-canvas pt-10 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Coluna Editorial Esquerda */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:py-4">
            <div className="space-y-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                Nova Hartz · Padaria Artesanal
              </p>

              <h1
                className="font-display font-bold tracking-tight text-ink"
                style={{
                  fontSize: 'clamp(2.5rem, 4.8vw, 4.15rem)',
                  lineHeight: 1.04,
                }}
              >
                Pão quente de verdade, toda manhã.
              </h1>

              <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Fornadas artesanais na hora certa, direto do forno para a sua mesa.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary-hover whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Conversar no WhatsApp</span>
              </a>

              <a
                href="#produtos"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink transition-colors duration-150 hover:text-primary whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <span>Ver cardápio do dia</span>
                <ArrowDownRight className="h-4 w-4 text-primary" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Coluna Fotográfica Direita — Imagem Grande e Marcante */}
          <div className="relative lg:col-span-7">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -bottom-3 hidden h-full w-full rounded-2xl border border-secondary/70 bg-secondary-soft/45 sm:block"
            />
            <div className="relative h-full min-h-[280px] overflow-hidden rounded-2xl border border-hairline bg-surface sm:min-h-[380px] lg:min-h-[460px]">
              <SafeImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                priority
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
