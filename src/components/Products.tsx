import { useWishlist } from "@/contexts/WishlistContext";
import { ProductsTypes } from "@/types/dataTypes";
import { columnGap, horizontalPadding } from "@/utils";
import { formatRupiah } from "@indodev/toolkit";
import Lucide from "@react-native-vector-icons/lucide";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Heart } from "lucide-react-native";
import { Pressable, Text, useWindowDimensions, View } from "react-native";

export default function Products({ product }: { product: ProductsTypes }) {
  const { width } = useWindowDimensions();

  const cardWidth = (width - horizontalPadding * 2 - columnGap) / 2;

  const { wishlists, addWishlist } = useWishlist();

  const isWishlist = wishlists.some(
    (wishlist) => wishlist.product_id === product.id,
  );

  return (
    <Pressable
      style={{ width: cardWidth }}
      onPress={() =>
        router.push({
          pathname: "/products/[id]",
          params: { id: product.id.toString() },
        })
      }
    >
      {/* Gambar produk */}
      <View className="relative">
        <Image
          source={product.img}
          style={{
            width: "100%",
            height: 180,
            borderRadius: 30,
          }}
          contentFit="cover"
        />

        {/* Diskon dan favorit */}
        <View
          className={`absolute left-2 right-2 top-2 flex-row items-center justify-${product.label ? "between" : "end"} p-2`}
        >
          {product.label && (
            <Text className="rounded-3xl bg-red-400 px-3 py-2 font-poppins-medium text-[10px] text-white">
              {product.label}
            </Text>
          )}

          <Pressable
            className="rounded-full bg-white p-2"
            onPress={() => addWishlist(product.id)}
          >
            <Heart
              size={18}
              fill={isWishlist ? "red" : "white"}
              strokeWidth={isWishlist ? 0 : 2}
            />
          </Pressable>
        </View>
      </View>

      {/* Rating */}
      <View className="mt-2">
        <View className="flex-row gap-1.5">
          <Lucide name="star" size={18} color="orange" />
          <Text className="font-poppins-regular">{product.avgStar}</Text>
          <Text className="font-poppins-regular text-gray-400">
            ({product.totalStar})
          </Text>
        </View>

        {/* Nama produk */}
        <Text numberOfLines={2} className="font-poppins-semibold">
          {product.name}
        </Text>

        {/* Harga */}
        <View className="flex-row flex-wrap items-center gap-x-3">
          {product.discountPrice != null && (
            <Text className="font-poppins-semibold text-[15px] text-red-500">
              {formatRupiah(product.discountPrice)}
            </Text>
          )}

          <Text
            className={
              product.discountPrice != null
                ? "text-sm text-gray-400 line-through"
                : "font-poppins-semibold text-[15px] text-red-500"
            }
          >
            {formatRupiah(product.price)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
