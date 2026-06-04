export interface Lp {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
}

export type CartItems = Lp[];
