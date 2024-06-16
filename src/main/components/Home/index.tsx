import { notMobilePlatform } from "@/src/core/config";
import tw from "@/src/core/tailwind";
import React from "react";
import { View } from "react-native";
import { Tabs } from "../../base/Flowbite/Tabs";
import HomeOPhim from "./OPhim";
import HomePhimNguonC from "./PhimNguonC";

const Home = () => {
  return (
    <View style={[tw`grow`, notMobilePlatform ? tw`pt-3` : tw``]}>
      <Tabs
        items={[
          { title: "Ổ Phim", children: <HomeOPhim /> },
          { title: "Phim Nguồn C", children: <HomePhimNguonC /> },
        ]}
      />
    </View>
  );
};

export default Home;
