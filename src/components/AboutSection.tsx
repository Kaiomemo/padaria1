import { motion } from 'motion/react';
import { ABOUT_IMAGE } from '../data/bakery';
import { SafeImage } from './SafeImage';

const CRAFT_PILLARS = [
  {
    number: '01.',
    title: 'Receita de casa, sem atalhos',
    detail: 'Farinha selecionada, fermentação respeitada e ingredientes frescos em cada massa.',
  },
  {
    number: '02.',
    title: 'Fornadas ao longo do dia',
    detail: 'Pães, cucas e salgados saem quentes em pequenas levas para preservar aroma e textura.',
  },
  {
    number: '03.',
    title: 'Atendimento de vizinhança',
    detail: 'Você escolhe no balcão ou combina tudo direto pelo WhatsApp com quem assa.',
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="border-t border-hairline bg-surface py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Imagem Editorial em Arco de Forno à Esquerda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 -left-3 hidden h-full w-full rounded-t-full rounded-b-2xl border border-secondary bg-transparent sm:block"
              />
              <div className="relative overflow-hidden rounded-t-full rounded-b-2xl border border-hairline bg-card">
                <SafeImage
                  src={ABOUT_IMAGE.src}
                  alt={ABOUT_IMAGE.alt}
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Narrativa e Pilares à Direita */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 lg:col-span-7"
          >
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                Nossa Tradição
              </p>
              <h2
                className="font-display font-bold tracking-tight text-ink"
                style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.08 }}
              >
                Receitas de família, feitas sem pressa.
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Na Grande Família Alimentos, cada manhã começa antes do sol nascer com o
                cheiro de pão assando e massa fresca na bancada. Cozinhamos como quem
                prepara o café para as pessoas de casa.
              </p>
            </div>

            <div className="divide-y divide-hairline border-t border-b border-hairline">
              {CRAFT_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-5">
                    <h3 className="font-display text-lg font-bold text-ink">
                      <span className="mr-2 font-sans text-sm font-bold text-primary tabular-nums">
                        {pillar.number}
                      </span>
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted sm:col-span-7">
                    {pillar.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
