import { motion } from 'motion/react';
import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BAKERY_CONTACT, CONTACT_IMAGE, buildWhatsAppUrl } from '../data/bakery';
import { SafeImage } from './SafeImage';

export function ContactSection() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá, Grande Família Alimentos! Gostaria de saber o horário de atendimento e as fornadas de hoje.'
  );

  return (
    <section
      id="contato"
      className="bg-canvas py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Informações Reais de Contato à Esquerda */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-8 lg:col-span-5"
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                Visite a Padaria
              </p>
              <h2
                className="font-display font-bold tracking-tight text-ink"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.08 }}
              >
                Esperamos você no Centro de Nova Hartz.
              </h2>
            </div>

            <div className="divide-y divide-hairline border-t border-b border-hairline">
              <div className="flex items-start gap-4 py-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-wide uppercase text-muted">
                    Endereço
                  </p>
                  <p className="text-base font-semibold text-ink">
                    {BAKERY_CONTACT.addressLine}
                  </p>
                  <p className="text-sm text-muted">{BAKERY_CONTACT.cityStateZip}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-wide uppercase text-muted">
                    Telefone & WhatsApp
                  </p>
                  <a
                    href={`tel:+${BAKERY_CONTACT.whatsappDigits}`}
                    className="inline-block text-base font-semibold text-ink tabular-nums transition-colors hover:text-primary"
                  >
                    {BAKERY_CONTACT.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold tracking-wide uppercase text-muted">
                    Horário das fornadas
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    Consulte o horário atualizado e a disponibilidade do balcão direto
                    pelo WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
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
                href={BAKERY_CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-hairline px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-surface whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span>Ver no mapa</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Fotografia Ampla do Balcão à Direita */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="h-full min-h-[280px] overflow-hidden rounded-2xl border border-hairline bg-surface">
              <SafeImage
                src={CONTACT_IMAGE.src}
                alt={CONTACT_IMAGE.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
