import tw from "@/src/core/tailwind";
import { Tabs } from "@/src/main/base/Flowbite/Tabs";
import OPhim from "@/src/main/components/OPhim";
import React from "react";
import { View } from "react-native";

const Index = () => {
  return (
    <View style={tw`flex-1 bg-white p-3`}>
      <Tabs
        items={[
          { title: "Ổ Phim", children: <OPhim /> },
          { title: "Phim Mới Chill", children: <View /> },
        ]}
      />
    </View>
  );
};

export default Index;
