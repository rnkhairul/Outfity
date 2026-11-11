import { useAuth } from "@/contexts/AuthContext";
import { user } from "@/libs/data";
import { MaskedView } from "@expo/ui/community/masked-view";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Login() {
  const img = require("@/assets/images/Outfity/img-login.png");
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const doLogin = () => {
    if (email === user.email && password === user.password) {
      Toast.show({
        type: "success",
        text1: "Berhasil login",
      });

      login();
    } else {
      Toast.show({
        type: "error",
        text1: "Email atau Password salah!",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-[#FFF8F0] relative">
      <View className="p-6">
        {/* Section */}
        <View className="flex-row justify-between mb-10">
          <View className="gap-3">
            <View>
              <Text className="font-poppins-bold text-5xl">Welcome</Text>
              <Text className="font-poppins-bold text-5xl">Back!</Text>
            </View>
            <Text className="font-poppins-regular">
              Sign in to your account
            </Text>
          </View>
          <View className="top-[-20px]">
            <View
              style={styles.item}
              className="absolute top-[-40px] right-[-80px] w-[250px] h-[200px] bg-orange-200"
            ></View>
            <View
              style={[
                styles.item,
                {
                  width: 250,
                  height: 200,
                  position: "absolute",
                  top: -30,
                  right: -80,
                },
              ]}
              className="absolute top-[-40px] right-[-80px] w-[250px] h-[200px]"
            >
              <LinearGradient
                colors={["#fed7aa", "#ff6900"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[StyleSheet.absoluteFill, styles.item]}
              />
            </View>
            <Image
              source={img}
              style={{
                width: 160,
                height: 160,
                transform: [{ rotate: "10deg" }, { translateY: -10 }],
              }}
            />
          </View>
        </View>

        {/* Section */}
        <View className="gap-y-4 mb-2">
          <View className="flex-row items-center gap-2 px-5 py-3 bg-white rounded-2xl">
            <View className="w-12 h-12 rounded-2xl bg-[#FFF0E9] items-center justify-center">
              <Mail color="#F45B12" strokeWidth={2.3} />
            </View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Email atau Telepon"
              className=" w-full pe-7"
            />
          </View>
          <View className="flex-row items-center gap-2 px-5 py-3 bg-white rounded-2xl">
            <View className="w-12 h-12 rounded-2xl bg-[#FFF0E9] items-center justify-center">
              <LockKeyhole color="#F45B12" strokeWidth={2.3} />
            </View>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Password"
              className="w-3/4"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              className=""
            >
              {showPassword ? (
                <Eye size={23} color="#888888" />
              ) : (
                <EyeOff size={23} color="#888888" />
              )}
            </Pressable>
          </View>
        </View>

        {/* Section */}
        <View className="flex-row justify-end mb-5">
          <MaskedView
            style={{ width: 128, height: 25 }}
            maskElement={
              <Text className="font-inter-medium">Forgot Password?</Text>
            }
          >
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  experimental_backgroundImage:
                    "linear-gradient(135deg, #ff8904, #8e51ff)",
                },
              ]}
            ></View>
          </MaskedView>
        </View>

        {/* Section */}
        <Pressable onPress={doLogin}>
          {({ pressed }) => (
            <>
              <LinearGradient
                colors={
                  pressed ? ["#fb2c36", "#fb2c36"] : ["#ff8904", "#e7000b"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ paddingVertical: 15, borderRadius: 18 }}
              >
                <Text className="font-inter-semibold text-lg text-center text-white">
                  Login
                </Text>
              </LinearGradient>
            </>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    borderTopLeftRadius: 1000,
    borderTopRightRadius: 300,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 1000,
  },
});
