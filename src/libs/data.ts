import {
  CartTypesWithId,
  CategoriesTypes,
  ProductsTypes,
} from "@/types/dataTypes";

export const categories: CategoriesTypes[] = [
  {
    id: 1,
    name: "semua",
  },
  {
    id: 2,
    name: "atasan",
  },
  {
    id: 3,
    name: "celana",
  },
  {
    id: 4,
    name: "sepatu",
  },
  {
    id: 5,
    name: "tas",
  },
];

export const products: ProductsTypes[] = [
  {
    id: 1,
    name: "Oversized Washed Denim Trucker Jacket",
    category: "atasan",
    label: "Terlaris",
    storeName: "Poppy Studio",
    avgStar: 4.8,
    totalStar: 214,
    price: 459000,
    discountPrice: 349000,
    img: require("@/assets/images/Outfity/products/Oversized Washed Denim Trucker Jacket.jpg"),
  },
  {
    id: 2,
    name: "Kaos Polo Rugby Vintage Chicago Unisex",
    category: "atasan",
    label: "Baru",
    storeName: "StepUp",
    avgStar: 4.8,
    totalStar: 412,
    price: 58500,
    img: require("@/assets/images/Outfity/products/Kaos Polo Rugby Vintage Chicago Unisex.jpg"),
  },
  {
    id: 3,
    name: "Sneakers Shoes",
    category: "sepatu",
    storeName: "Urban Supply",
    avgStar: 4.9,
    totalStar: 530,
    price: 459000,
    img: require("@/assets/images/Outfity/products/shoes.jpg"),
  },
  {
    id: 4,
    name: "Aesthetic Olive Green Cargo Pants _ Streetwear Fashion Inspiration",
    category: "celana",
    label: "Diskon 13%",
    storeName: "Hype District",
    avgStar: 4.7,
    totalStar: 168,
    price: 320000,
    discountPrice: 279000,
    img: require("@/assets/images/Outfity/products/Aesthetic Olive Green Cargo Pants _ Streetwear Fashion Inspiration.jpg"),
  },
  {
    id: 5,
    name: "Eyeglass",
    category: "aksesoris",
    storeName: "Everyday Studio",
    avgStar: 4.8,
    totalStar: 102,
    price: 79000,
    img: require("@/assets/images/Outfity/products/eyeglass.jpg"),
  },
  {
    id: 6,
    name: "GAVAGENIX Higher_Ransel Sekolah Backpack Hitam",
    category: "tas",
    label: "Diskon 14%",
    storeName: "Street Culture",
    avgStar: 4.9,
    totalStar: 221,
    price: 129000,
    discountPrice: 150000,
    img: require("@/assets/images/Outfity/products/GAVAGENIX Higher_Ransel Sekolah Backpack Hitam.jpg"),
  },
];

export const carts: CartTypesWithId[] = [
  {
    id: 1,
    product_id: 3,
    quantity: 2,
  },
  {
    id: 2,
    product_id: 6,
    quantity: 1,
  },
];

export const user = {
  email: "user1@gmail.com",
  password: "rahasia123",
};
