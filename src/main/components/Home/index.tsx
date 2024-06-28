import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Text } from "../../base/Native/Text";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import HomeTabKKPhim from "./Tabs/Sources/KKPhim";
import HomeTabOPhim from "./Tabs/Sources/OPhim";
import HomeTabPhimNguonC from "./Tabs/Sources/PhimNguonC";
import HomeTabsSwitch from "./Tabs/TabSwitch";

const tabs = [
  {
    title: (
      <Text size={16} style={tw`text-white font-bold`}>
        Ổ Phim
      </Text>
    ),
    children: <HomeTabOPhim />,
  },
  {
    title: (
      <Text size={16} style={tw`text-white font-bold`}>
        KK Phim
      </Text>
    ),
    children: <HomeTabKKPhim />,
  },
  {
    title: (
      <Text size={16} style={tw`text-white font-bold`}>
        Phim Nguồn C
      </Text>
    ),
    children: <HomeTabPhimNguonC />,
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
              <HomeTabsSwitch tabs={tabs} />
            </View>
          </View>
          {currentTab.children}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
