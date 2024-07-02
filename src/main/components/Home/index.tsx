import { isTVPlatform } from "@/src/core/config";
import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { Text } from "../../base/Native/Text";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import { visibleSwitchTabsState } from "../../recoil/home/atoms";
import HomeTabKKPhim from "./Tabs/Sources/KKPhim";
import HomeTabOPhim from "./Tabs/Sources/OPhim";
import HomeTabPhimNguonC from "./Tabs/Sources/PhimNguonC";
import HomeTabsSwitch from "./Tabs/TabSwitch";
import { layout } from "@/src/core/layout";

const tabs = [
  {
    title: "Ổ Phim",
    children: <HomeTabOPhim />,
  },
  {
    title: "KK Phim",
    children: <HomeTabKKPhim />,
  },
  {
    title: "Phim Nguồn C",
    children: <HomeTabPhimNguonC />,
  },
];

const HomeScreen = () => {
  const { tab = 0 } = useLocalSearchParams();

  const [visibleSwitchTabs, setVisibleSwitchTabs] = useRecoilState(
    visibleSwitchTabsState,
  );

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
            style={[
              tw`bg-sky-500`,
              tw`pl-[${layout.widthLeftTabBar}px]`,
              insets.paddingTop > 0 ? insets : tw`pt-3`,
            ]}>
            <View
              style={tw`flex-row justify-between items-center p-3 pt-0 android:pt-3`}>
              <Text size={17} style={tw`text-white font-bold`}>
                {currentTab.title}
              </Text>
              <HomeTabsSwitch
                tabs={tabs}
                visibleSwitchTabs={visibleSwitchTabs}
                onChangeVisibleSwitchTabs={(visible) =>
                  setVisibleSwitchTabs(visible)
                }
              />
            </View>
          </View>
          <View style={tw`flex-1 pl-[${layout.widthLeftTabBar}px]`}>
            {isTVPlatform && !visibleSwitchTabs && currentTab.children}
            {!isTVPlatform && currentTab.children}
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
