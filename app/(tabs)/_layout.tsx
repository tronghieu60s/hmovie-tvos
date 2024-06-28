import tw from "@/src/core/tailwind";
import { Tabs } from "expo-router";
import { Home, SearchNormal } from "iconsax-react-native";
import React from "react";
import { s } from "react-native-size-matters";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Home
              color={color}
              style={tw`text-[${s(20)}px] sm:text-[${s(15)}px]`}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <SearchNormal
              color={color}
              style={tw`text-[${s(20)}px] sm:text-[${s(15)}px]`}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
