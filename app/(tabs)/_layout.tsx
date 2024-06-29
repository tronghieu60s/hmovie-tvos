import tw from "@/src/core/tailwind";
import { visibleSwitchTabsState } from "@/src/main/recoil/home/atoms";
import { Tabs, useSegments } from "expo-router";
import { Home, SearchNormal } from "iconsax-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { s } from "react-native-size-matters";
import { useToast } from "react-native-toast-notifications";
import { useRecoilState } from "recoil";

const TabLayout = () => {
  const toast = useToast();
  const segments = useSegments();

  const [exitAppCount, setExitAppCount] = useState(0);

  const [visibleSwitchTabs, setVisibleSwitchTabs] = useRecoilState(
    visibleSwitchTabsState,
  );

  const onBackHandlerAction = useCallback(() => {
    if (visibleSwitchTabs) {
      setVisibleSwitchTabs(false);
      return true;
    }

    if (!segments.includes("(tabs)")) {
      return false;
    }

    setExitAppCount((prev) => prev + 1);
    setTimeout(() => setExitAppCount(0), 2000);

    if (exitAppCount === 1) {
      BackHandler.exitApp();
    } else {
      toast.show("Nhấn lần nữa để thoát ứng dụng", { duration: 2000 });
    }

    return true;
  }, [exitAppCount, segments, setVisibleSwitchTabs, toast, visibleSwitchTabs]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackHandlerAction,
    );
    return () => backHandler.remove();
  }, [onBackHandlerAction]);

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
