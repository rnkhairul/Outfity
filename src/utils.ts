import { products } from "./libs/data";
import { CartTypesWithId, FilterProductTypes } from "./types/dataTypes";

export const horizontalPadding = 20;
export const columnGap = 12;
export const filterProduct = (carts: CartTypesWithId[]) => {
  return carts.flatMap((cart) => {
    const product = products.find((product) => product.id === cart.product_id);

    if (!product) return [];

    return [
      {
        ...product,
        quantity: cart.quantity,
      },
    ];
  });
};

export const subTotal = (filteredProducts: FilterProductTypes[]): number => {
  return filteredProducts.reduce(
    (total, value) => total + value.price * value.quantity,
    0,
  );
};

export const ongkir = 15000;
