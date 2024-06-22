import tw from "@/src/core/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Tabs } from "../../base/Flowbite/Tabs";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import HomeTabOPhim from "./Tabs/OPhim";
import HomeTabPhimNguonC from "./Tabs/PhimNguonC";
import HomeTabKKPhim from "./Tabs/KKPhim";

const HomeScreen = () => {
  const { tab } = useLocalSearchParams();

  const onChangeTab = useCallback((index: number) => {
    router.setParams({ tab: `${index}`, page: `1` });
  }, []);

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={[tw`grow bg-white`, insets]}>
      <View style={[tw`grow sm:pt-3`]}>
        <Tabs
          items={[
            { title: "Ổ Phim", children: <HomeTabOPhim /> },
            { title: "Phim Nguồn C", children: <HomeTabPhimNguonC /> },
            { title: "KK Phim", children: <HomeTabKKPhim /> },
          ]}
          currentTab={tab ? Number(tab) : 0}
          onChangeTab={onChangeTab}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
