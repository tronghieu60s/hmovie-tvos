import tw from "@/src/core/tailwind";
import { Tabs } from "@/src/main/base/Flowbite/Tabs";
import OPhim from "@/src/main/components/OPhim";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import React from "react";
import { Platform, View } from "react-native";

const Index = () => {
  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={[tw`grow bg-white`, insets]}>
      <View style={Platform.OS === 'web' || Platform.isTV ? tw`grow pt-3` : tw`grow`}>
        <Tabs
          items={[
            { title: "Ổ Phim", children: <OPhim /> },
            { title: "Phim Mới Chill", children: <View /> },
          ]}
        />
      </View>
    </View>
  );
};

export default Index;
