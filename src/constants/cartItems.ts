import type { CartItem } from "../types/cart";

export const initialCartItems: CartItem[] = [
  {
    id: "1",
    title: "Dynamite",
    artist: "BTS",
    price: 1500,
    image: "https://picsum.photos/seed/bts-dynamite/80/80",
    amount: 1,
  },
  {
    id: "2",
    title: "LOVE DIVE",
    artist: "IVE",
    price: 1200,
    image: "https://picsum.photos/seed/ive-lovedive/80/80",
    amount: 2,
  },
  {
    id: "3",
    title: "Hype Boy",
    artist: "NewJeans",
    price: 1300,
    image: "https://picsum.photos/seed/nj-hypeboy/80/80",
    amount: 1,
  },
  {
    id: "4",
    title: "ANTIFRAGILE",
    artist: "LE SSERAFIM",
    price: 1400,
    image: "https://picsum.photos/seed/ls-anti/80/80",
    amount: 1,
  },
  {
    id: "5",
    title: "Pink Venom",
    artist: "BLACKPINK",
    price: 1600,
    image: "https://picsum.photos/seed/bp-pv/80/80",
    amount: 1,
  },
];
