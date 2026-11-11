import { categories } from "@/libs/data";
import React from "react";
import { FlatList, Pressable, Text } from "react-native";

interface ListCategoriesTypes {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function ListCategories({
  selectedCategory,
  setSelectedCategory,
}: ListCategoriesTypes) {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ gap: 8 }}
      renderItem={({ item }) => {
        const isSelected =
          item.name.toLowerCase() === selectedCategory.toLowerCase();

        return (
          <Pressable onPress={() => setSelectedCategory(item.name)}>
            <Text
              className={`flex-shrink-0 rounded-3xl px-4 py-2 font-poppins-regular ${
                isSelected
                  ? "bg-red-400 font-poppins-medium text-white"
                  : "text-zinc-700"
              }`}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}
