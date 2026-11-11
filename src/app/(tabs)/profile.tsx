import ProfileMenuItem from "@/components/ProfileMenuItem";
import { useAuth } from "@/contexts/AuthContext";
import { Image } from "expo-image";
import {
  Bell,
  Box,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  Settings,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Profile() {
  const { logout } = useAuth();

  const doLogout = () => {
    logout();

    Toast.show({
      type: "info",
      text1: "Telah Logout",
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="px-5 pt-5 pb-8">
          <Text className="font-poppins-extrabold text-[24px]">Profile</Text>
          {/* Profile Section */}
          <View className="flex-row items-center gap-5 px-6 py-4 rounded-[2.5rem] bg-orange-300 mb-6">
            <View className="border-4 border-white rounded-full">
              <Image
                source={require("@/assets/images/Outfity/profile1.jpg")}
                style={{ width: 70, height: 70, borderRadius: 100 }}
              />
            </View>
            <View className="gap-1.5">
              <Text className="font-poppins-bold text-xl text-[#4E2304]">
                Randi Khairul
              </Text>
              <Text className="font-inter-light text-sm text-[#4E2304]">
                user1@gmail.com
              </Text>
              <Text className="bg-red-500 text-white font-inter-medium text-[12px] py-1 px-3.5 self-start rounded-[2rem]">
                Member Gold
              </Text>
            </View>
          </View>

          {/* Section */}
          <View className="flex-row justify-around p-6 bg-white rounded-[2.5rem] shadow mb-6">
            <View className="gap-y-1">
              <Text className="text-center font-poppins-bold text-red-500 text-2xl">
                12
              </Text>
              <Text className="text-center font-poppins-light text-sm">
                Pesanan
              </Text>
            </View>
            <View className="h-full w-px bg-gray-200"></View>
            <View className="gap-y-1">
              <Text className="text-center font-poppins-bold text-red-500 text-2xl">
                28
              </Text>
              <Text className="text-center font-poppins-light text-sm">
                Favorit
              </Text>
            </View>
            <View className="h-full w-px bg-gray-200"></View>
            <View className="gap-y-1">
              <Text className="text-center font-poppins-bold text-red-500 text-2xl">
                5
              </Text>
              <Text className="text-center font-poppins-light text-sm">
                Voucher
              </Text>
            </View>
          </View>

          {/* Section */}
          <View className="bg-white shadow rounded-[2rem] mb-6">
            <ProfileMenuItem
              title="Pesanan Saya"
              icon={<Box size={20} />}
              isFirst={true}
            />
            <ProfileMenuItem
              title="Alamat Pengiriman"
              icon={<MapPin size={20} />}
            />
            <ProfileMenuItem title="Wishlist" icon={<Heart size={20} />} />
            <ProfileMenuItem title="Notifikasi" icon={<Bell size={20} />} />
            <ProfileMenuItem
              title="Pengaturan Akun"
              icon={<Settings size={20} />}
            />
            <ProfileMenuItem title="Bantuan" icon={<HelpCircle size={20} />} />
          </View>

          <Pressable
            className="flex-row justify-center gap-x-2 rounded-[2rem] bg-white py-4 active:bg-red-500 group"
            onPress={doLogout}
          >
            {({ pressed }) => (
              <>
                <LogOut size={20} color={pressed ? "#ffffff" : "#fb2c36"} />
                <Text
                  className={`text-red-500 font-poppins-semibold ${pressed ? "text-white" : "text-red-500"}`}
                >
                  Keluar
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
