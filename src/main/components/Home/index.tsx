import { notMobilePlatform } from "@/src/core/config";
import tw from "@/src/core/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { View } from "react-native";
import { Tabs } from "../../base/Flowbite/Tabs";
import HomeTabOPhim from "./Tabs/OPhim";
import HomeTabPhimNguonC from "./Tabs/PhimNguonC";

const Home = () => {
  const { tab } = useLocalSearchParams();

  const onChangeTab = useCallback((index: number) => {
    router.setParams({ tab: `${index}`, page: `1` });
  }, []);

  return (
    <View style={[tw`grow`, notMobilePlatform ? tw`pt-3` : tw``]}>
      <Tabs
        items={[
          { title: "Ổ Phim", children: <HomeTabOPhim /> },
          { title: "Phim Nguồn C", children: <HomeTabPhimNguonC /> },
        ]}
        currentTab={tab ? Number(tab) : 0}
        onChangeTab={onChangeTab}
      />
    </View>
  );
};

export default Home;
