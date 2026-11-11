import React from "react";
import { Pressable, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

interface DataTypes {
  title: string;
  desc: string;
}

interface PaymentMethodCardTypes {
  value: string;
  icon: React.ReactNode;
  checked: string;
  setChecked: React.Dispatch<React.SetStateAction<string>>;
  data: DataTypes;
}
export default function PaymentMethodCard({
  value,
  icon,
  checked,
  setChecked,
  data,
}: PaymentMethodCardTypes) {
  return (
    <Pressable
      className={`flex-row justify-between items-center p-4 border-2 rounded-[3rem] bg-white ${checked === value ? " border-red-500" : "border-transparent"}`}
      onPress={() => setChecked(value)}
    >
      <View className="flex-row gap-3 ">
        <View className="self-center bg-amber-200 p-3 rounded-full">
          {/* <Wallet size={24} /> */}
          {icon}
        </View>
        <View>
          <Text className="font-poppins-medium text-base">{data.title}</Text>
          <Text className="font-poppins-regular text-sm text-gray-500">
            {data.desc}
          </Text>
        </View>
      </View>
      <RadioButton
        value={value}
        status={checked === value ? "checked" : "unchecked"}
        onPress={() => setChecked(value)}
        color="#fb2c36"
      />
    </Pressable>
  );
}
