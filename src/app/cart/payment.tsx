import PaymentMethodCard from "@/components/PaymentMethodCard";
import { useCart } from "@/contexts/CartContext";
import { filterProduct, ongkir, subTotal } from "@/utils";
import { formatRupiah } from "@indodev/toolkit";
import { router } from "expo-router";
import { CreditCard, MapPin, Truck, Wallet } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payment() {
  const [checked, setChecked] = useState<string>("ewallet");
  const { carts, truncateCart } = useCart();
  const filteredProducts = useMemo(() => filterProduct(carts), [carts]);
  const subsTotal = useMemo(
    () => subTotal(filteredProducts),
    [filteredProducts],
  );

  const total = subsTotal + ongkir;

  return (
    <SafeAreaView className="p-6 flex-1">
      <View className="gap-2 bg-white py-3 px-6 rounded-lg mb-7">
        <View className="flex-row items-center gap-2">
          <MapPin size={18} color="red" />
          <Text className="font-poppins-semibold text-lg">
            Alamat Pengiriman
          </Text>
        </View>
        <View>
          <View className="flex-row gap-1 -mb-0.5">
            <Text className="font-poppins-medium">Randi Khairul</Text>
            <Text>•</Text>
            <Text className="font-poppins-medium">0812-3456-7890</Text>
          </View>
          <Text className="font-poppins-regular text-sm text-gray-500">
            Jl. Melati No.12, Kebayoran Baru, Jakarta Selatan, 12150
          </Text>
        </View>
      </View>

      {/* Section */}
      <View className="mb-7">
        <Text className="font-poppins-semibold text-lg mb-2">
          Metode Pembayaran
        </Text>
        <View className="gap-3">
          <PaymentMethodCard
            value="ewallet"
            icon={<Wallet size={24} />}
            checked={checked}
            setChecked={setChecked}
            data={{ title: "E-Wallet", desc: "GoPay, OVO, Dana" }}
          />
          <PaymentMethodCard
            value="credit"
            icon={<CreditCard size={24} />}
            checked={checked}
            setChecked={setChecked}
            data={{ title: "Kartu Kredit", desc: "Visa, Mastercard" }}
          />
          <PaymentMethodCard
            value="cod"
            icon={<Truck size={24} />}
            checked={checked}
            setChecked={setChecked}
            data={{ title: "Bayar Ditempat", desc: "Cash on delivery" }}
          />
        </View>
      </View>

      {/* Section */}
      <View className="bg-white p-6 gap-4 rounded-3xl">
        <Text className="font-poppins-semibold text-lg">Ringkasan Pesanan</Text>
        <View className="gap-1">
          <View className="flex-row justify-between">
            <Text className="font-poppins-medium text-gray-500">Sub Total</Text>
            <Text className="font-poppins-semibold">
              {formatRupiah(subsTotal)}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-poppins-medium text-gray-500">
              Ongkos Kirim
            </Text>
            <Text className="font-poppins-semibold">
              {formatRupiah(ongkir)}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between pt-2 border-t-2 border-gray-100">
          <Text className="font-poppins-bold text-xl">Total</Text>
          <Text className="font-poppins-extrabold text-red-500 text-xl">
            {formatRupiah(total)}
          </Text>
        </View>
      </View>

      {/* Section */}
      <View className="mt-auto">
        <Pressable
          className="bg-red-500 py-4 rounded-[2rem] active:bg-red-600"
          onPress={() => {
            router.replace("/cart/payment-success");
            truncateCart();
          }}
        >
          <Text className="text-center text-white text-lg font-poppins-medium">
            Bayar {formatRupiah(total)}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
