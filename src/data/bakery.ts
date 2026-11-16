export type MenuCategory = 'Pães' | 'Bolos' | 'Doces' | 'Salgados';

export interface BakeryProduct {
  id: string;
  name: string;
  category: MenuCategory;
  unitLabel: string;
  description: string;
  price: number;
  image: string;
  alt: string;
}

export const BAKERY_CONTACT = {
  brandName: 'Grande Família Alimentos',
  shortBrand: 'Grande Família',
  addressLine: 'R. Tamôio, 190 - 75-1 - Centro',
  cityStateZip: 'Nova Hartz - RS, 93890-000',
  fullAddress: 'R. Tamôio, 190 - 75-1 - Centro, Nova Hartz - RS, 93890-000',
  phoneDisplay: '+55 51 99754-1407',
  whatsappDigits: '5551997541407',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=R.+Tam%C3%B4io%2C+190+-+75-1+-+Centro%2C+Nova+Hartz+-+RS%2C+93890-000',
} as const;

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_padaria_forno_1794848639624.jpg',
  alt: 'Padeiro retirando pães franceses e pães rústicos dourados do forno artesanal da Grande Família Alimentos',
};

export const ABOUT_IMAGE = {
  src: '/src/assets/images/sobre_tradicao_padeiro_1794848635666.jpg',
  alt: 'Padeiro artesanal polvilhando farinha sobre massas de pão frescas na bancada de madeira',
};

export const CONTACT_IMAGE = {
  src: '/src/assets/images/contato_balcao_padaria_1794848635135.jpg',
  alt: 'Balcão acolhedor da padaria Grande Família Alimentos com prateleiras de pães, bolos e folhados frescos',
};

export const MENU_CATEGORIES: ReadonlyArray<'Todos' | MenuCategory> = [
  'Todos',
  'Pães',
  'Bolos',
  'Doces',
  'Salgados',
];

export const BAKERY_PRODUCTS: ReadonlyArray<BakeryProduct> = [
  {
    id: 'pao-frances',
    name: 'Pão Francês Crocante',
    category: 'Pães',
    unitLabel: 'kg',
    description: 'Casca fina e estaladiça com miolo macio, assado em fornadas ao longo do dia.',
    price: 18.9,
    image: '/src/assets/images/prod_pao_frances_1794848635833.jpg',
    alt: 'Cesto com pães franceses dourados e crocantes recém-saídos do forno',
  },
  {
    id: 'pao-colonial',
    name: 'Pão Colonial Rústico',
    category: 'Pães',
    unitLabel: 'unidade',
    description: 'Fermentação cuidada, casca caramelizada e sabor marcante para o café da família.',
    price: 22.0,
    image: '/src/assets/images/prod_pao_fermentacao_1794848637186.jpg',
    alt: 'Pão colonial rústico fatiado sobre tábua de madeira escura com farinha',
  },
  {
    id: 'bolo-fuba-goiabada',
    name: 'Bolo de Fubá com Goiabada',
    category: 'Bolos',
    unitLabel: 'inteiro',
    description: 'Massa fofinha de milho moído na hora com calda artesanal de goiabada cremosa.',
    price: 36.0,
    image: '/src/assets/images/prod_bolo_fuba_1794848636623.jpg',
    alt: 'Bolo caseiro de fubá polvilhado com açúcar e cobertura de goiabada derretida',
  },
  {
    id: 'bolo-brigadeiro',
    name: 'Bolo de Chocolate Brigadeiro',
    category: 'Bolos',
    unitLabel: 'inteiro',
    description: 'Cacau intenso em massa úmida, coberto com ganache cremosa e brigadeiros.',
    price: 68.0,
    image: '/src/assets/images/prod_bolo_chocolate_1794848637381.jpg',
    alt: 'Bolo caseiro de chocolate com cobertura brilhante de brigadeiro em prato de cerâmica',
  },
  {
    id: 'cuca-banana-farofa',
    name: 'Cuca Tradicional de Banana',
    category: 'Doces',
    unitLabel: 'forma',
    description: 'Massa amanteigada com bananas caramelizadas e farofa crocante de manteiga.',
    price: 38.0,
    image: '/src/assets/images/prod_cuca_alema_1794848637475.jpg',
    alt: 'Cuca tradicional gaúcha com farofa crocante dourada e banana em tábua rústica',
  },
  {
    id: 'sonho-creme',
    name: 'Sonho Recheado de Creme',
    category: 'Doces',
    unitLabel: 'unidade',
    description: 'Massa leve e dourada com recheio generoso de creme de baunilha cozido na casa.',
    price: 8.5,
    image: '/src/assets/images/prod_sonho_creme_1794848637877.jpg',
    alt: 'Sonhos artesanais fofinhos recheados com creme de baunilha e açúcar fino',
  },
  {
    id: 'pao-de-queijo',
    name: 'Pão de Queijo da Casa',
    category: 'Salgados',
    unitLabel: 'porção 6 un.',
    description: 'Queijo curado em porção generosa, crocante por fora e macio por dentro.',
    price: 16.0,
    image: '/src/assets/images/prod_pao_queijo_1794848638373.jpg',
    alt: 'Tigela de cerâmica com pães de queijo dourados e quentes sobre linho',
  },
  {
    id: 'croissant-empada',
    name: 'Croissants & Empadas Assadas',
    category: 'Salgados',
    unitLabel: 'unidade',
    description: 'Massa folhada na manteiga e empadinhas de massa podre com recheio artesanal.',
    price: 9.5,
    image: '/src/assets/images/prod_croissant_salgado_1794848637208.jpg',
    alt: 'Bandeja com croissants folhados dourados e empadas artesanais assadas',
  },
];

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function buildWhatsAppUrl(message?: string): string {
  const defaultMsg =
    'Olá, Grande Família Alimentos! Gostaria de fazer um pedido pelo WhatsApp.';
  const text = encodeURIComponent(message ?? defaultMsg);
  return `https://wa.me/${BAKERY_CONTACT.whatsappDigits}?text=${text}`;
}
