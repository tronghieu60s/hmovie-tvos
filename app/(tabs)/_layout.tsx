import { Tabs } from "expo-router";
import { Home } from "iconsax-react-native";
import React from "react";
import { scale } from "react-native-size-matters";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: scale(10), marginBottom: 4 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <Home color={color} />,
          tabBarLabel: "Trang chủ",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
