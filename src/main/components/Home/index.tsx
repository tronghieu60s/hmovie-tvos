import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import { Android, Apple } from "iconsax-react-native";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "../../base/Native/Text";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import HomeTabAnimeHay from "./TabsSources/AnimeHay";
import HomeTabKKPhim from "./TabsSources/KKPhim";
import HomeTabOPhim from "./TabsSources/OPhim";
import HomeTabPhimMoiChill from "./TabsSources/PhimMoiChill";
import HomeTabPhimNguonC from "./TabsSources/PhimNguonC";
import HomeTabsSourcesSwitch from "./TabsSourcesSwitch";

const tabs = [
  {
    title: (
      <Text size={15} style={tw`text-white font-bold`}>
        Ổ Phim
      </Text>
    ),
    children: <HomeTabOPhim />,
  },
  {
    title: (
      <Text size={15} style={tw`text-white font-bold`}>
        KK Phim
      </Text>
    ),
    children: <HomeTabKKPhim />,
  },
  {
    title: (
      <Text size={15} style={tw`text-white font-bold`}>
        Phim Nguồn C
      </Text>
    ),
    children: <HomeTabPhimNguonC />,
  },
  {
    title: (
      <View style={tw`flex-row items-center gap-1`}>
        <Text size={15} style={tw`text-white font-bold`}>
          Anime Hay
        </Text>
        <View style={tw`flex-row items-center gap-1`}>
          <Android color={tw.color("white")} size={20} />
          <Apple color={tw.color("white")} size={20} />
        </View>
      </View>
    ),
    children: <HomeTabAnimeHay />,
  },
  {
    title: (
      <View style={tw`flex-row items-center gap-1`}>
        <Text size={15} style={tw`text-white font-bold`}>
          Phim Mới Chill
        </Text>
        <View style={tw`flex-row items-center gap-1`}>
          <Android color={tw.color("white")} size={20} />
          <Apple color={tw.color("white")} size={20} />
        </View>
      </View>
    ),
    children: <HomeTabPhimMoiChill />,
  },
];

const HomeScreen = () => {
  const { tab = 0 } = useLocalSearchParams();

  const insets = useSafeAreaInsetsStyle(["top"]);

  const currentTab = useMemo(
    () => tabs.find((_, index) => index === Number(tab)),
    [tab],
  );

  return (
    <View style={tw`grow bg-white`}>
      {currentTab && (
        <View style={tw`grow`}>
          <View
            style={[tw`bg-sky-500`, insets.paddingTop > 0 ? insets : tw`pt-3`]}>
            <View
              style={tw`flex-row justify-between items-center px-3 pt-0 pb-3`}>
              <Text size={18} style={tw`font-bold p-0`}>
                {currentTab.title}
              </Text>
              <HomeTabsSourcesSwitch tabs={tabs} />
            </View>
          </View>
          {currentTab.children}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
