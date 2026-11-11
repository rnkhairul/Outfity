import ListCategories from "@/components/ListCategories";
import Products from "@/components/Products";
import Search from "@/components/Search";
import { products } from "@/libs/data";
import { columnGap, horizontalPadding } from "@/utils";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Category() {
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
          <View>
            {/* Judul Halaman */}
            <Text className="font-poppins-bold text-[24px] mb-1">Kategori</Text>

            {/* Search */}
            <Search
              placeholder="Cari produk..."
              onSearch={setSearch}
              className="mb-6"
            />

            {/* Kategori */}
            <ListCategories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <Text className="font-poppins-regular text-gray-400 mt-5">
              {filteredProducts.length} Produk ditemukan
            </Text>
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
