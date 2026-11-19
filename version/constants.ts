// Dados fixos do jantar. Para mudar data, menus ou pratos, altere apenas este ficheiro.

export const DINNER_DATE = '4 Dez';
export const DINNER_DATE_LABEL = '4 de Dezembro';

export interface MenuOption {
  name: string;
  price: string;
  mains: string[];
}

export const MENUS: MenuOption[] = [
  {
    name: 'Menu 1 · Tradicional',
    price: '29,90 €',
    mains: ['Bacalhau com natas', 'Bifinhos de frango', 'Bitoque'],
  },
  {
    name: 'Menu 2 · Premium',
    price: '34,90 €',
    mains: ['Bacalhau com broa', 'Secreto de porco', 'Arroz de pato', 'Dourada grelhada'],
  },
  {
    name: 'Menu 3 · Especial',
    price: '42,90 €',
    mains: ['Polvo à lagareiro', 'Bacalhau à lagareiro', 'Bochecha de porco preto com puré', 'Picanha Black Angus'],
  },
];

export const findMenu = (name?: string | null): MenuOption | undefined =>
  MENUS.find(m => m.name === name);
