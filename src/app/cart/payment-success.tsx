import { Link } from "expo-router";
import { CircleCheck } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentSuccess() {
  return (
    <SafeAreaView className="flex-1 bg-red-50">
      <View className="flex-1 justify-center items-center gap-6 px-8">
        <View className="bg-amber-400 p-6 rounded-full">
          <CircleCheck size={50} color="#ff6467" />
        </View>
        <Text className="font-poppins-extrabold text-2xl">
          Pesanan berhasil!
        </Text>
        <Text className="text-center font-poppins-regular text-gray-500">
          Terima kasih sudah belanja. Pesananmu sedang kami siapkan dan akan
          segera dikirim.
        </Text>
        <Link href="/(tabs)" asChild>
          <Pressable className="bg-red-500 py-4 rounded-[2rem] active:bg-red-600 w-full">
            <Text className="text-center text-white font-poppins-medium">
              Kembali ke Beranda
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
