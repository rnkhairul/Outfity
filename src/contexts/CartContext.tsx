import { CartTypes, CartTypesWithId } from "@/types/dataTypes";
import React, { createContext, useContext, useState } from "react";

interface CartContextTypes {
  carts: CartTypesWithId[];
  addCart: (item: CartTypes) => boolean;
  updateCart: (item: { id: number; quantity: number }) => boolean;
  deleteCart: (id: number) => void;
  truncateCart: () => void;
}

export const CartContext = createContext<CartContextTypes | undefined>(
  undefined,
);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [carts, setCarts] = useState<CartTypesWithId[]>([
    // {
    //   id: 1,
    //   product_id: 2,
    //   quantity: 3,
    // },
    // {
    //   id: 2,
    //   product_id: 5,
    //   quantity: 2,
    // },
    // {
    //   id: 3,
    //   product_id: 3,
    //   quantity: 2,
    // },
    // {
    //   id: 4,
    //   product_id: 4,
    //   quantity: 2,
    // },
    // {
    //   id: 5,
    //   product_id: 6,
    //   quantity: 2,
    // },
    // {
    //   id: 6,
    //   product_id: 1,
    //   quantity: 2,
    // },
  ]);

  const addCart = ({ product_id, quantity }: CartTypes) => {
    if (!product_id || !quantity) {
      return false;
    }

    const cartReady = carts.find((cart) => cart.product_id === product_id);

    if (cartReady) {
      setCarts(
        carts.map((cart) => {
          if (cart.product_id === product_id) {
            return {
              ...cart,
              quantity: cart.quantity + quantity,
            };
          } else {
            return cart;
          }
        }),
      );
    } else {
      setCarts((prevCarts) => [
        ...prevCarts,
        {
          id: (prevCarts.at(-1)?.id ?? 0) + 1,
          product_id: product_id,
          quantity: quantity,
        },
      ]);
    }

    return true;
  };

  const updateCart = ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }): boolean => {
    if (!id || !quantity) {
      console.log("ID : ", id);
      console.log("Quantity : ", quantity);
      return false;
    }

    setCarts(
      carts.map((cart) => {
        if (cart.product_id === id) {
          return {
            ...cart,
            quantity: quantity,
          };
        } else {
          return cart;
        }
      }),
    );

    return true;
  };

  const deleteCart = (id: number) => {
    setCarts(
      carts.filter((cart) => {
        return cart.product_id !== id;
      }),
    );
  };

  const truncateCart = () => {
    setCarts([]);
  };

  return (
    <CartContext.Provider
      value={{ carts, addCart, updateCart, deleteCart, truncateCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextTypes {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("Context cannot be used outside the provider");
  }

  return context;
}
