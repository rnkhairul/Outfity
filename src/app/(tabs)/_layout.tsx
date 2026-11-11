import { useCart } from "@/contexts/CartContext";
import Lucide from "@react-native-vector-icons/lucide";
import { Tabs } from "expo-router";

function AppLayout() {
  const { carts } = useCart();

  const badge = carts.length || undefined;

  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "salmon", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Lucide name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Kategori",
          tabBarIcon: ({ color }) => (
            <Lucide name="layout-grid" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Keranjang",
          tabBarIcon: ({ color }) => (
            <Lucide name="shopping-bag" size={24} color={color} />
          ),
          tabBarBadge: badge,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Lucide name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function NavigationLayout() {
  return <AppLayout />;
}
