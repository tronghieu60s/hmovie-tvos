import { layout } from "@/src/core/layout";
import tw from "@/src/core/tailwind";
import { BlurView } from "expo-blur";
import { router, usePathname } from "expo-router";
import React from "react";
import { View } from "react-native";
import LeftTabBarButton from "./Button";

const LeftTabBar = () => {
  const pathname = usePathname();

  return (
    <BlurView
      tint="default"
      intensity={100}
      style={tw`absolute w-[${layout.widthLeftTabBar}px] h-full z-10`}>
      <View style={tw`flex-1 items-center justify-center gap-5`}>
        <LeftTabBarButton
          active={pathname === "/"}
          iconName="Home"
          onPress={() => router.replace("/")}
          hasTVPreferredFocus
        />
        <LeftTabBarButton
          active={pathname === "/search"}
          iconName="SearchNormal"
          onPress={() => router.replace("/search")}
        />
      </View>
    </BlurView>
  );
};

export default LeftTabBar;
