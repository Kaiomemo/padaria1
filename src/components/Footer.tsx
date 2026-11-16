import { BAKERY_CONTACT, buildWhatsAppUrl } from '../data/bakery';

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <a
              href="#inicio"
              className="font-display text-2xl font-bold tracking-tight text-ink"
            >
              {BAKERY_CONTACT.brandName}
            </a>
            <p className="text-sm text-muted">{BAKERY_CONTACT.fullAddress}</p>
          </div>

          <nav
            aria-label="Links do rodapé"
            className="flex flex-wrap items-center gap-6 text-sm font-semibold text-muted"
          >
            <a href="#inicio" className="transition-colors hover:text-primary">
              Início
            </a>
            <a href="#produtos" className="transition-colors hover:text-primary">
              Cardápio
            </a>
            <a href="#sobre" className="transition-colors hover:text-primary">
              Sobre
            </a>
            <a href="#encomendas" className="transition-colors hover:text-primary">
              Encomendas
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-primary-hover"
            >
              WhatsApp
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-hairline pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {BAKERY_CONTACT.brandName}. Todos os direitos reservados.</p>
          <p>Nova Hartz · Rio Grande do Sul</p>
        </div>
      </div>
    </footer>
  );
}
