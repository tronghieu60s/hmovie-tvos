import tw from "@/src/core/tailwind";
import React from "react";
import { Platform, View } from "react-native";
import { Tabs } from "../../base/Flowbite/Tabs";
import HomeOPhim from "./OPhim";

const Home = () => {
  return (
    <View
      style={Platform.OS === "web" || Platform.isTV ? tw`grow pt-3` : tw`grow`}
    >
      <Tabs
        items={[
          { title: "Ổ Phim", children: <HomeOPhim /> },
          { title: "Phim Mới Chill", children: <View /> },
        ]}
      />
    </View>
  );
};

export default Home;
