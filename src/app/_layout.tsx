import AuthProvider, { useAuth } from "@/contexts/AuthContext";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";

import CartProvider from "@/contexts/CartContext";
import WishlistProvider from "@/contexts/WishlistContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import "../global.css";

SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { isLoggedIn } = useAuth();

  const [loaded, error] = useFonts({
    "Poppins-Light": Poppins_300Light,
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Medium": Poppins_500Medium,
    "Poppins-SemiBold": Poppins_600SemiBold,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-ExtraBold": Poppins_800ExtraBold,
    "Poppins-Black": Poppins_900Black,

    "Inter-Light": Inter_300Light,
    "Inter-Regular": Inter_400Regular,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,

    // "Plus-Jakarta-Sans-Regular": PlusJakartaSans_400Regular,
    // "Plus-Jakarta-Sans-Medium": PlusJakartaSans_500Medium,
    // "Plus-Jakarta-Sans-SemiBold": PlusJakartaSans_600SemiBold,
    // "Plus-Jakarta-Sans-Bold": PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="login" />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="products/[id]"
            options={{ title: "Detail Produk" }}
          />
          <Stack.Screen
            name="cart/payment"
            options={{ title: "Pembayaran", headerShown: true }}
          />
          <Stack.Screen
            name="cart/payment-success"
            // options={{  }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <PaperProvider settings={{ rippleEffectEnabled: false }}>
              <AppLayout />
            </PaperProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
      <Toast />
    </>
  );
}
