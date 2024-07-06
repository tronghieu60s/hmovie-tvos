import { isTVPlatform } from "@/src/core/config";
import { layout } from "@/src/core/layout";
import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";
import { Text } from "../../base/Native/Text";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import { visibleSwitchTabsState } from "../../recoil/home/atoms";
import { MovieSource } from "../../recoil/movie/types";
import HomeTabItem from "./Tabs/TabItem";
import HomeTabsSwitch from "./Tabs/TabSwitch";

const tabs: {
  title: string;
  source: MovieSource;
}[] = [
  { title: "Anime Hay", source: "animehay" },
  { title: "Ổ Phim", source: "ophim" },
  { title: "KK Phim", source: "kkphim" },
  { title: "Phim Nguồn C", source: "phimnguonc" },
];

const HomeScreen = () => {
  const { source = "ophim" } = useLocalSearchParams();

  const [visibleSwitchTabs, setVisibleSwitchTabs] = useRecoilState(
    visibleSwitchTabsState,
  );

  const insets = useSafeAreaInsetsStyle(["top"]);

  const currentTab = useMemo(
    () => tabs.find((item) => item.source === source),
    [source],
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
            <View style={tw`flex-row justify-between items-center p-3 pt-0`}>
              <Text size={17} style={tw`text-white font-bold`}>
                {currentTab.title}
              </Text>
              <HomeTabsSwitch
                tabs={tabs}
                visible={visibleSwitchTabs}
                onChangeVisible={(visible) => setVisibleSwitchTabs(visible)}
              />
            </View>
          </View>
          <View style={tw`flex-1 pl-[${layout.widthLeftTabBar}px]`}>
            {isTVPlatform && !visibleSwitchTabs && <HomeTabItem />}
            {!isTVPlatform && <HomeTabItem />}
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
