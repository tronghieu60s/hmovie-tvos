import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BackHandler, View } from "react-native";
import { Text } from "../../base/Native/Text";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import HomeTabKKPhim from "./Tabs/Sources/KKPhim";
import HomeTabOPhim from "./Tabs/Sources/OPhim";
import HomeTabPhimNguonC from "./Tabs/Sources/PhimNguonC";
import HomeTabsSwitch from "./Tabs/TabSwitch";
import { isTVPlatform } from "@/src/core/config";
import { useToast } from "react-native-toast-notifications";

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
  const toast = useToast();
  const { tab = 0 } = useLocalSearchParams();

  const [exitAppCount, setExitAppCount] = useState(0);

  const insets = useSafeAreaInsetsStyle(["top"]);

  const [visibleSwitchTabs, setVisibleSwitchTabs] = useState(false);

  const onBackHandlerAction = useCallback(() => {
    if (visibleSwitchTabs) {
      setVisibleSwitchTabs(false);
      return true;
    }

    setExitAppCount((prev) => prev + 1);
    setTimeout(() => setExitAppCount(0), 2000);

    if (exitAppCount === 1) {
      BackHandler.exitApp();
    } else {
      toast.show("Nhấn lần nữa để thoát ứng dụng", { duration: 2000 });
    }

    return true;
  }, [exitAppCount, toast, visibleSwitchTabs]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackHandlerAction,
    );
    return () => backHandler.remove();
  }, [onBackHandlerAction]);

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
              <Text size={17} style={tw`font-bold p-0`}>
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
          {isTVPlatform && !visibleSwitchTabs && currentTab.children}
          {!isTVPlatform && currentTab.children}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
