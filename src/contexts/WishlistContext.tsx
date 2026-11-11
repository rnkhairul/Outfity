import React, { createContext, useContext, useState } from "react";

interface WishlistTypes {
  id: number;
  product_id: number;
  favorite: boolean;
}

interface WishlistContextTypes {
  wishlists: WishlistTypes[];
  addWishlist: (product_id: number) => boolean;
}

export const WishlistContext = createContext<WishlistContextTypes | undefined>(
  undefined,
);

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlists, setWishlist] = useState<WishlistTypes[]>([]);

  const addWishlist = (product_id: number): boolean => {
    if (!product_id) {
      return false;
    }

    const isWishlistReady = wishlists.some(
      (wishlist) => wishlist.product_id === product_id,
    );

    if (isWishlistReady) {
      setWishlist(
        wishlists.filter((wishlist) => wishlist.product_id !== product_id),
      );
    } else {
      setWishlist((prevWishlist) => [
        ...prevWishlist,
        {
          id: (prevWishlist.at(-1)?.id ?? 0) + 1,
          product_id: product_id,
          favorite: true,
        },
      ]);
    }
    return true;
  };

  return (
    <WishlistContext.Provider value={{ wishlists, addWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextTypes {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("Context cannot be used outside the provider");
  }

  return context;
}
