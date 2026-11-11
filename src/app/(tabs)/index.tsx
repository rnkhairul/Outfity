import ListCategories from "@/components/ListCategories";
import Products from "@/components/Products";
import Search from "@/components/Search";
import { products } from "@/libs/data";
import { columnGap, horizontalPadding } from "@/utils";
import { Lucide } from "@react-native-vector-icons/lucide";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("semua");
  const [search, setSearch] = useState<string>("");

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchCategory =
      selectedCategory.toLowerCase() === "semua" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchSearch && matchCategory;
  });

  return (
    <SafeAreaView className="flex-1 bg-red-50">
      <FlatList
        className="flex-1"
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          gap: columnGap,
          justifyContent: "flex-start",
        }}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: 20,
          paddingBottom: 32,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="gap-6">
            {/* Header */}
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-poppins-regular text-zinc-500">
                  Halo, selamat datang!
                </Text>

                <Text className="font-poppins-bold text-[24px]">
                  Randi Khairul
                </Text>
              </View>

              <View className="rounded-full bg-white p-3">
                <Lucide name="bell" size={24} />
              </View>
            </View>

            {/* Search */}
            <View className="flex-row items-center gap-3">
              <Search
                placeholder="Cari baju, sepatu, tas..."
                onSearch={setSearch}
              />

              <Pressable className="rounded-full bg-red-500 p-3">
                <Lucide name="sliders-horizontal" color="white" size={24} />
              </Pressable>
            </View>

            {/* Promo */}
            <View className="flex-row justify-between rounded-3xl bg-amber-300 px-5 py-3.5">
              <View className="grow gap-3">
                <Text className="self-start rounded-3xl bg-[#FB5C45] px-5 py-1.5 font-inter-semibold text-[10px] uppercase text-white">
                  Flash Sale
                </Text>

                <Text className="font-poppins-extrabold text-2xl text-[#4E2304]">
                  Diskon s/d 50%
                </Text>

                <Text className="font-poppins-regular text-[11px]">
                  Koleksi musim panas terbaru
                </Text>

                <Pressable className="self-start rounded-3xl bg-white px-5 py-3">
                  <Text className="font-poppins-semibold text-sm">
                    Belanja Sekarang
                  </Text>
                </Pressable>
              </View>

              <View className="self-center">
                <Image
                  source={require("@/assets/images/Outfity/promote4.png")}
                  style={{ width: 130, height: 130 }}
                  contentFit="cover"
                />
              </View>
            </View>

            {/* Kategori */}
            <View className="gap-3">
              <View className="flex-row justify-between">
                <Text className="font-poppins-extrabold text-xl">Kategori</Text>

                <Pressable>
                  <Text className="font-inter-medium text-red-400">
                    Lihat Semua
                  </Text>
                </Pressable>
              </View>
              <ListCategories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </View>

            {/* Judul produk */}
            <View className="flex-row justify-between">
              <Text className="font-poppins-extrabold text-xl">Untukmu</Text>

              <Pressable>
                <Text className="font-inter-medium text-red-400">
                  Lihat Semua
                </Text>
              </Pressable>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center py-10">
            <Text className="font-poppins-regular text-zinc-500">
              Produk ini belum tersedia.
            </Text>
          </View>
        }
        renderItem={({ item }) => <Products product={item} />}
      />
    </SafeAreaView>
  );
}
