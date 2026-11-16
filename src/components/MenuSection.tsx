import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Minus, Plus, Trash2 } from 'lucide-react';
import {
  BAKERY_PRODUCTS,
  MENU_CATEGORIES,
  buildWhatsAppUrl,
  formatBRL,
  type BakeryProduct,
  type MenuCategory,
} from '../data/bakery';
import { SafeImage } from './SafeImage';

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<'Todos' | MenuCategory>('Todos');
  const [cart, setCart] = useState<Record<string, number>>({});

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'Todos') {
      return BAKERY_PRODUCTS;
    }
    return BAKERY_PRODUCTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const nextQty = (prev[id] ?? 0) + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  const clearCart = () => setCart({});

  const selectedItems = useMemo(() => {
    return BAKERY_PRODUCTS.filter((p) => (cart[p.id] ?? 0) > 0).map((product) => ({
      product,
      quantity: cart[product.id],
    }));
  }, [cart]);

  const totalItems = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.quantity, 0),
    [selectedItems]
  );

  const totalAmount = useMemo(
    () =>
      selectedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [selectedItems]
  );

  const orderWhatsAppUrl = useMemo(() => {
    if (selectedItems.length === 0) {
      return buildWhatsAppUrl(
        'Olá, Grande Família Alimentos! Gostaria de consultar o cardápio do dia.'
      );
    }

    const lines = selectedItems.map(
      ({ product, quantity }) =>
        `- ${quantity}x ${product.name} (${formatBRL(product.price * quantity)})`
    );

    const message = [
      'Olá, Grande Família Alimentos! Montei meu pedido no cardápio digital:',
      '',
      ...lines,
      '',
      `Total estimado: ${formatBRL(totalAmount)}`,
      'Pode confirmar a disponibilidade?',
    ].join('\n');

    return buildWhatsAppUrl(message);
  }, [selectedItems, totalAmount]);

  return (
    <section
      id="produtos"
      className="bg-canvas py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção + Filtro por Categoria */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-8 border-b border-hairline pb-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Cardápio Digital
            </p>
            <h2
              className="font-display font-bold tracking-tight text-ink"
              style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)', lineHeight: 1.08 }}
            >
              Saindo do forno hoje
            </h2>
            <p className="text-base leading-relaxed text-muted">
              Escolha seus favoritos para montar seu pedido e enviar direto pelo WhatsApp.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar produtos por categoria"
            className="flex flex-wrap items-center gap-2 rounded-xl bg-surface p-1.5 self-start lg:self-end"
          >
            {MENU_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grade Editorial em 2 Colunas */}
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
          {visibleProducts.map((product, index) => (
            <ProductEditorialItem
              key={product.id}
              product={product}
              quantity={cart[product.id] ?? 0}
              index={index}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>

        {/* Resumo do Pedido Digital (Inline, limpo e sem sobrepor o mobile) */}
        <motion.div
          id="resumo-pedido"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 flex flex-col justify-between gap-6 rounded-2xl border border-hairline bg-card p-6 sm:p-8 lg:flex-row lg:items-center"
        >
          <div className="space-y-1.5">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted">
              Seu pedido no cardápio
            </p>
            {totalItems > 0 ? (
              <div className="space-y-1">
                <p className="font-display text-2xl font-bold text-ink tabular-nums">
                  {totalItems} {totalItems === 1 ? 'item selecionado' : 'itens selecionados'} ·{' '}
                  <span className="text-primary">{formatBRL(totalAmount)}</span>
                </p>
                <p className="text-sm text-muted">
                  {selectedItems
                    .map(({ product, quantity }) => `${quantity}x ${product.name}`)
                    .join(' · ')}
                </p>
              </div>
            ) : (
              <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
                Prefere conversar direto com o balcão?
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {totalItems > 0 && (
              <button
                type="button"
                onClick={clearCart}
                aria-label="Limpar itens selecionados"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-hairline px-4 py-2 text-xs font-semibold text-muted transition-colors hover:bg-surface hover:text-ink whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Limpar</span>
              </button>
            )}

            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-primary-hover whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>
                {totalItems > 0 ? 'Enviar pedido no WhatsApp' : 'Conversar no WhatsApp'}
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ProductEditorialItemProps {
  product: BakeryProduct;
  quantity: number;
  index: number;
  onUpdateQuantity: (id: string, delta: number) => void;
}

function ProductEditorialItem({
  product,
  quantity,
  index,
  onUpdateQuantity,
}: ProductEditorialItemProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay: Math.min((index % 2) * 0.08, 0.16),
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex flex-col"
    >
      <div className="overflow-hidden rounded-2xl border border-hairline bg-surface">
        <SafeImage
          src={product.image}
          alt={product.alt}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-5 flex flex-1 flex-col justify-between gap-4 border-b border-hairline pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted">
            <span className="text-primary">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>Por {product.unitLabel}</span>
          </div>

          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-2xl font-bold leading-snug text-ink">
              {product.name}
            </h3>
            <span className="font-sans text-lg font-bold text-ink tabular-nums whitespace-nowrap shrink-0">
              {formatBRL(product.price)}
            </span>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-muted">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          {quantity === 0 ? (
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, 1)}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-hairline bg-card px-4 py-2 text-xs font-semibold text-ink transition-colors duration-150 hover:border-primary hover:bg-primary hover:text-on-primary whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Adicionar ao pedido</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary-tint px-2 py-1">
              <button
                type="button"
                aria-label={`Remover uma unidade de ${product.name}`}
                onClick={() => onUpdateQuantity(product.id, -1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="min-w-[2ch] text-center text-sm font-bold text-primary tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                aria-label={`Adicionar uma unidade de ${product.name}`}
                onClick={() => onUpdateQuantity(product.id, 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          <a
            href={buildWhatsAppUrl(
              `Olá, Grande Família Alimentos! Gostaria de pedir: ${product.name}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-muted underline-offset-4 transition-colors hover:text-primary hover:underline whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Pedir este item
          </a>
        </div>
      </div>
    </motion.article>
  );
}
