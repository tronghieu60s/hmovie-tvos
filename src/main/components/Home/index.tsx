import tw from "@/src/core/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Tabs } from "../../base/Flowbite/Tabs";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import HomeTabAnimeHay from "./Tabs/AnimeHay";
import HomeTabKKPhim from "./Tabs/KKPhim";
import HomeTabOPhim from "./Tabs/OPhim";
import HomeTabPhimNguonC from "./Tabs/PhimNguonC";

const HomeScreen = () => {
  const { tab } = useLocalSearchParams();

  const onChangeTab = useCallback((index: number) => {
    router.setParams({ tab: `${index}`, page: `1` });
  }, []);

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={[tw`grow bg-white`, insets]}>
      <View style={[tw`grow pt-0 web:pt-3`]}>
        <Tabs
          items={[
            { title: "Ổ Phim", children: <HomeTabOPhim /> },
            { title: "KK Phim", children: <HomeTabKKPhim /> },
            { title: "Phim Nguồn C", children: <HomeTabPhimNguonC /> },
            { title: "Anime Hay", children: <HomeTabAnimeHay /> },
          ]}
          currentTab={tab ? Number(tab) : 0}
          onChangeTab={onChangeTab}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
