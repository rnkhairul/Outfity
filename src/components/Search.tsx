import Lucide from "@react-native-vector-icons/lucide";
import { Dispatch, SetStateAction } from "react";
import { TextInput, View } from "react-native";

interface SearchTypes {
  placeholder: string;
  className?: string;
  onSearch: Dispatch<SetStateAction<string>>;
}

export default function Search({
  placeholder,
  className,
  onSearch,
}: SearchTypes) {
  return (
    <View
      className={`flex-1 flex-row items-center gap-3 rounded-3xl bg-white px-5 py-2 ${className}`}
    >
      <Lucide name="search" size={22} />

      <TextInput
        className="flex-1 rounded-xl"
        placeholder={placeholder}
        onChangeText={onSearch}
      />
    </View>
  );
}
