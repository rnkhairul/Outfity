import { useCart } from "@/contexts/CartContext";
import { products } from "@/libs/data";
import { horizontalPadding } from "@/utils";
import { formatRupiah } from "@indodev/toolkit";
import Lucide from "@react-native-vector-icons/lucide";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { Minus, Plus, ShoppingBag } from "lucide-react-native";
import { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const { carts, updateCart, deleteCart } = useCart();

  const filteredProducts = useMemo(() => {
    return carts.flatMap((cart) => {
      const product = products.find(
        (product) => product.id === cart.product_id,
      );

      if (!product) return [];

      return [
        {
          ...product,
          quantity: cart.quantity,
        },
      ];
    });
  }, [carts]);

  const isCartEmpty = filteredProducts.length === 0;

  const changeQuantity = (id: number, quantity: number): void => {
    updateCart({ id, quantity });
  };

  const subTotal = useMemo((): number => {
    return filteredProducts.reduce(
      (total, value) => total + value.price * value.quantity,
      0,
    );
  }, [filteredProducts]);

  const ongkosKirim = 15000;

  const total = subTotal + ongkosKirim;

  return (
    <SafeAreaView className="flex-1 bg-red-50">
      {isCartEmpty ? (
        <View className="h-full items-center justify-center gap-4">
          <View className="bg-amber-200 p-6 rounded-full">
            <ShoppingBag size={40} strokeWidth={2} color="#6a7282" />
          </View>
          <Text className="font-poppins-black text-2xl">Keranjang Kosong</Text>
          <Text className="font-poppins-regular text-gray-500">
            Yuk mulai belanja koleksi favoritmu
          </Text>
          <Link href="/(tabs)" asChild>
            <Pressable className="bg-red-500 py-4 px-9 rounded-[2rem] active:bg-red-600">
              <Text className="font-poppins-medium text-lg text-white">
                Mulai Belanja
              </Text>
            </Pressable>
          </Link>
        </View>
      ) : (
        <>
          <FlatList
            data={filteredProducts}
            contentContainerStyle={{
              paddingHorizontal: horizontalPadding,
              paddingTop: 20,
              paddingBottom: 32,
              gap: 16,
            }}
            ListHeaderComponent={
              <View>
                <Text className="font-poppins-extrabold text-[24px]">
                  Keranjang
                </Text>
              </View>
            }
            ListEmptyComponent={
              <View className="items-center py-10">
                <Text className="font-poppins-regular text-zinc-500">
                  Produk pada kategori ini belum tersedia.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <View className="flex-row gap-3 p-5 shadow-md rounded-3xl bg-slate-50">
                <View className="shadow-md">
                  <Image
                    source={item.img}
                    style={{ width: 100, height: 100 }}
                    contentFit="cover"
                  />
                </View>
                <View className="w-2/3">
                  <View className="flex-row justify-between">
                    <View className="w-3/4">
                      <Text className="font-poppins-semibold" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text className="font-poppins-regular text-gray-500 text-sm">
                        Ukuran M
                      </Text>
                    </View>
                    <Pressable onPress={() => deleteCart(item.id)}>
                      <Lucide name="trash-2" size={18} color="red" />
                    </Pressable>
                  </View>

                  <View className="flex-1 justify-end">
                    <View className="flex-row justify-between">
                      <Text className="font-poppins-semibold text-[15px] text-red-500">
                        {formatRupiah(item.price)}
                      </Text>
                      <View className="flex-row items-center gap-4">
                        <Pressable
                          className={` p-2 rounded-full  ${item.quantity === 1 ? "bg-gray-300 opacity-40" : "bg-amber-300 active:bg-amber-400"}`}
                          onPress={() =>
                            changeQuantity(item.id, item.quantity! - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                          <Minus size={12} color="black" strokeWidth={3} />
                        </Pressable>
                        <Text>{item.quantity}</Text>
                        <Pressable
                          className="bg-red-500 p-2 rounded-full active:bg-red-600"
                          onPress={() =>
                            changeQuantity(item.id, item.quantity! + 1)
                          }
                        >
                          <Plus size={12} color="white" strokeWidth={3} />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />

          <View className="px-6 py-4 rounded-t-[2rem] border-t border-red-200 bg-red-50">
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Text className="font-poppins-medium text-gray-500">
                  Sub Total
                </Text>
                <Text className="font-poppins-semibold">
                  {formatRupiah(subTotal)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-poppins-medium text-gray-500">
                  Ongkos Kirim
                </Text>
                <Text className="font-poppins-semibold">
                  {formatRupiah(ongkosKirim)}
                </Text>
              </View>
            </View>
            {/* Line Border */}
            <View className="h-px w-full my-3 bg-gray-300"></View>

            {/* Total */}
            <View className="flex-row justify-between mb-5">
              <Text className="font-poppins-semibold text-xl">Total</Text>
              <Text className="font-poppins-extrabold text-red-500 text-lg">
                {formatRupiah(total)}
              </Text>
            </View>
            <Pressable
              className="bg-red-500 p-4 rounded-[2rem] active:bg-red-600"
              onPress={() => router.push("/cart/payment")}
            >
              <Text className="font-poppins-medium text-white text-center">
                Lanjut ke Pembayaran
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
