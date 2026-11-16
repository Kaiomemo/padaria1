import { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/bakery';

const NAV_LINKS = [
  { href: '#produtos', label: 'Cardápio' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#encomendas', label: 'Encomendas' },
  { href: '#contato', label: 'Contato' },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zona 1: Wordmark em linha única */}
        <a
          href="#inicio"
          className="font-display text-xl font-bold tracking-tight text-ink whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          Grande Família
        </a>

        {/* Zona 2: Links de navegação limpos */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-muted"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: Ação principal + botão mobile */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-on-primary shadow-sm transition-colors duration-150 hover:bg-primary-hover whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Conversar no WhatsApp</span>
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-hairline text-ink transition-colors hover:bg-surface md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileOpen && (
        <div className="border-t border-hairline bg-canvas px-4 py-5 md:hidden">
          <nav aria-label="Navegação móvel" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-semibold text-ink transition-colors hover:bg-surface hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Conversar no WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
