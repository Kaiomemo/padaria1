import { useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/bakery';

const ORDER_TYPES = [
  'Bolo festivo ou caseiro',
  'Cucas e pães coloniais',
  'Bandeja de salgados',
  'Cesta de café da manhã',
] as const;

export function OrdersSection() {
  const [name, setName] = useState('');
  const [orderType, setOrderType] = useState<string>(ORDER_TYPES[0]);
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const trimmedName = name.trim();
  const trimmedNotes = notes.trim();

  const customOrderMessage = [
    'Olá, Grande Família Alimentos! Gostaria de fazer uma encomenda:',
    `Nome: ${trimmedName}`,
    `Tipo: ${orderType}`,
    trimmedNotes ? `Detalhes / data: ${trimmedNotes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappUrl = buildWhatsAppUrl(customOrderMessage);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (trimmedName.length < 2) {
      event.preventDefault();
      setErrorMsg('Informe seu nome para preparar a mensagem no WhatsApp.');
      setSubmitted(false);
      return;
    }

    setErrorMsg(null);
    setSubmitted(true);
  };

  return (
    <section
      id="encomendas"
      className="bg-ink py-24 text-canvas sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-4"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-secondary">
            Encomendas Sob Medida
          </p>
          <h2
            className="mx-auto font-display font-bold tracking-tight text-canvas"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3.25rem)', lineHeight: 1.08 }}
          >
            Sua mesa completa, na hora combinada.
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-canvas/80">
            Aniversários, cafés de empresa ou reuniões de família. Combine sabores e
            quantidades direto conosco.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-2xl border border-canvas/15 bg-canvas/5 p-6 sm:p-10"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="order-name"
                className="block text-xs font-semibold tracking-wide text-canvas/90"
              >
                Seu nome *
              </label>
              <input
                id="order-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Ex.: Maria Clara"
                className="h-12 w-full rounded-lg border border-canvas/20 bg-canvas/10 px-4 text-sm text-canvas placeholder:text-canvas/45 focus:border-secondary focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="order-type"
                className="block text-xs font-semibold tracking-wide text-canvas/90"
              >
                O que você procura
              </label>
              <select
                id="order-type"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="h-12 w-full rounded-lg border border-canvas/20 bg-ink px-4 text-sm text-canvas focus:border-secondary focus:outline-none"
              >
                {ORDER_TYPES.map((type) => (
                  <option key={type} value={type} className="bg-ink text-canvas">
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="order-notes"
                className="block text-xs font-semibold tracking-wide text-canvas/90"
              >
                Data desejada e quantidade (opcional)
              </label>
              <input
                id="order-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex.: Sábado às 9h · 2 cucas de banana e 30 pães de queijo"
                className="h-12 w-full rounded-lg border border-canvas/20 bg-canvas/10 px-4 text-sm text-canvas placeholder:text-canvas/45 focus:border-secondary focus:outline-none"
              />
            </div>
          </div>

          {errorMsg && (
            <p
              role="alert"
              className="mt-4 flex items-center gap-2 text-sm font-medium text-secondary"
            >
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{errorMsg}</span>
            </p>
          )}

          {submitted && !errorMsg && (
            <p
              role="status"
              className="mt-4 flex items-center gap-2 text-sm font-medium text-secondary"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Mensagem pronta! Se o WhatsApp não abriu automaticamente, clique no botão ao
                lado.
              </span>
            </p>
          )}

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-canvas/15 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs leading-relaxed text-canvas/70">
              Atendimento direto pelo WhatsApp da padaria para confirmar sabores e retirada.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary-hover whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Conversar no WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
