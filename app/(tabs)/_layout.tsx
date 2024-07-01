import { isTVPlatform } from "@/src/core/config";
import IconSax from "@/src/main/base/IconSax";
import { visibleSwitchTabsState } from "@/src/main/recoil/home/atoms";
import { Tabs, useSegments } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
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
        tabBarStyle: {
          display: isTVPlatform ? "none" : "flex",
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <IconSax name="Home" color={color} size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <IconSax name="SearchNormal" color={color} size={25} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
