import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/libs/data";
import { formatRupiah } from "@indodev/toolkit";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { ChevronLeft, Heart, Minus, Plus, Star } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function ProductDetail() {
  const [liked, setLiked] = useState<boolean>(false);
  const [currentSize, setCurrentSize] = useState<string>("s");
  const [quantity, setQuantity] = useState<number>(1);

  const { id } = useLocalSearchParams<{ id: string }>();
  const Id = Number(id);

  const product = products.find((product) => product.id === Id);

  const { wishlists, addWishlist } = useWishlist();
  const isWishlist = wishlists.some((wishlist) => wishlist.product_id === Id);

  const sizes = ["s", "m", "l", "xl"];

  const totalPrices = () => {
    if (!product) {
      throw new Error("Product Unknown");
    }
    return formatRupiah(product?.price * quantity);
  };

  const { addCart } = useCart();

  const addToCart = () => {
    const success = addCart({ product_id: Id, quantity: quantity });

    if (!success) {
      Toast.show({
        type: "error",
        text1: "Gagal Menambahkan Produk!",
        text2:
          "Terjadi kesalahan saat menambahkan produk ke keranjang. Silakan coba lagi",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Berhasil ditambahkan!",
        text2: "Produk berhasil ditambahkan ke keranjang belanja kamu!",
      });
    }
  };

  return (
    <SafeAreaView>
      <View className="relative h-full">
        <View className="relative pt-3">
          <Image source={product?.img} style={{ width: "100%", height: 350 }} />
          <View className="absolute w-full flex-row justify-between p-6">
            <Pressable
              className="bg-gray-200 p-2.5 rounded-full active:bg-red-500 active:text-white"
              onPress={() => router.back()}
            >
              {({ pressed }) => (
                <>
                  <ChevronLeft size={22} color={pressed ? "white" : "black"} />
                </>
              )}
            </Pressable>
            <Pressable
              className="bg-gray-200 p-2.5 rounded-full"
              onPress={() => addWishlist(Id)}
            >
              <Heart
                size={22}
                fill={isWishlist ? "red" : "none"}
                strokeWidth={isWishlist ? 0 : 2}
              />
            </Pressable>
          </View>
        </View>

        {/* Section */}
        <ScrollView
          className="p-6"
          alwaysBounceVertical={true}
          overScrollMode="always"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "60%" }}
        >
          {/* Section */}
          <View className="flex-row justify-between mb-4">
            <View className="gap-2">
              <Text className="font-poppins-medium text-sm text-red-600">
                {product?.storeName}
              </Text>
              <Text
                className="w-72 font-poppins-extrabold text-xl"
                numberOfLines={2}
              >
                {product?.name}
              </Text>
              <View className="flex-row font-poppins-regular text-sm gap-1.5">
                <Text className="font-poppins-regular text-sm text-gray-500">
                  {product?.totalStar}
                </Text>
                <Text className="text-gray-400">•</Text>
                <Text className="font-poppins-regular text-sm text-gray-500">
                  Warna Biru Denim
                </Text>
              </View>
            </View>
            <View className="">
              <View className="flex-row items-center gap-x-1.5 bg-amber-300 py-1.5 px-5 rounded-[2rem]">
                <Star size={16} fill="#4E2304" />
                <Text className="font-poppins-semibold text-[#4E2304] pt-1">
                  {product?.avgStar}
                </Text>
              </View>
            </View>
          </View>

          {/* Section */}
          <View className="gap-1 mb-4">
            <Text className="font-poppins-semibold">Pilih Ukuran</Text>
            <View className="flex-row gap-3">
              {sizes.map((size, index) => (
                <Text
                  key={index}
                  className={`uppercase py-2.5 px-5 rounded-3xl ${currentSize === size ? "bg-red-500 text-white" : ""}`}
                  onPress={() => setCurrentSize(size)}
                >
                  {size}
                </Text>
              ))}
            </View>
          </View>

          {/* Section */}
          <View className="w-[90%] mb-6">
            <Text className="font-poppins-semibold">Deskripsi</Text>
            <Text className="font-poppins-regular text-sm text-gray-600 text-justify">
              Jaket denim oversized super nyaman dengan potongan kekinian. Cocok
              dipadukan untuk gaya kasual harianmu.
            </Text>
          </View>

          {/* Section */}
          <View className="flex-row justify-between">
            <Text className="font-poppins-semibold">Jumlah</Text>
            <View className="flex-row items-center gap-6">
              <Pressable
                className="bg-amber-300 p-2 rounded-full active:bg-amber-400"
                onPress={() => {
                  if (quantity > 1) setQuantity((prev) => --prev);
                }}
              >
                <Minus size={18} color="black" strokeWidth={3} />
              </Pressable>
              <Text className="font-poppins-medium text-xl">{quantity}</Text>
              <Pressable
                className="bg-red-500 p-2 rounded-full active:bg-red-600"
                onPress={() => setQuantity((prev) => ++prev)}
              >
                <Plus size={18} color="white" strokeWidth={3} />
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* Section */}
        <View className="flex-row items-center gap-4 absolute bottom-0 left-0 right-0 p-5 bg-white">
          <View className="">
            <Text className="text-sm font-poppins-regular">Total Harga</Text>
            <Text className="text-2xl text-red-500 font-poppins-bold">
              {totalPrices()}
            </Text>
          </View>
          <Pressable
            className="flex-1 bg-red-500 active:bg-red-600 py-4 rounded-[2rem]"
            onPress={addToCart}
          >
            <Text className="text-white text-center font-poppins-semibold">
              Tambah ke Keranjang
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
