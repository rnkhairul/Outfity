import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface Props {
  title: string;
  icon: React.ReactNode;
  isLast?: boolean;
  isFirst?: boolean;
}

export default function ProfileMenuItem({
  title,
  icon,
  isLast = false,
  isFirst = false,
}: Props) {
  const borderStyle = !isLast ? "border-b border-gray-200" : "";
  const roundedStyle = [
    isFirst && "rounded-t-[2rem]",
    isLast && "rounded-b-[2rem]",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Pressable
      className={`flex-row items-center justify-between p-6 active:bg-orange-100 ${borderStyle} ${roundedStyle} `}
    >
      <View className="flex-row items-center gap-5">
        <View className="rounded-full bg-orange-100 p-3">{icon}</View>

        <Text className="font-poppins-medium">{title}</Text>
      </View>

      <ChevronRight size={20} color="black" />
    </Pressable>
  );
}
