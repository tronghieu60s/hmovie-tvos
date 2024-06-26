import tw from "@/src/core/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import { Android, Apple } from "iconsax-react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import { Text } from "../../base/Native/Text";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import HomeTabAnimeHay from "./Tabs/AnimeHay";
import HomeTabKKPhim from "./Tabs/KKPhim";
import HomeTabOPhim from "./Tabs/OPhim";
import HomeTabPhimNguonC from "./Tabs/PhimNguonC";

const tabs = [
  { title: "Ổ Phim", children: <HomeTabOPhim /> },
  { title: "KK Phim", children: <HomeTabKKPhim /> },
  { title: "Phim Nguồn C", children: <HomeTabPhimNguonC /> },
  {
    title: (
      <View style={tw`flex-row items-center gap-1`}>
        <Text>Anime Hay</Text>
        <View style={tw`flex-row items-center gap-1`}>
          <Android size={20} />
          <Apple size={20} />
        </View>
      </View>
    ),
    children: <HomeTabAnimeHay />,
  },
];

const HomeScreen = () => {
  const { tab = 0 } = useLocalSearchParams();

  const [visibleTabs, setVisibleTabs] = useState(false);

  const onChangeTab = useCallback((index: number) => {
    router.setParams({ tab: `${index}`, page: `1` });
    setVisibleTabs(false);
  }, []);

  const onToggleVisibleTabs = useCallback(() => {
    setVisibleTabs((prev) => !prev);
  }, []);

  const insets = useSafeAreaInsetsStyle(["top"]);

  const currentTab = useMemo(
    () => tabs.find((_, index) => index === Number(tab)),
    [tab],
  );

  return (
    <View style={[tw`grow bg-white`, insets]}>
      <View style={[tw`grow pt-0 web:pt-3`]}>
        {currentTab && (
          <View style={tw`grow`}>
            <View style={tw`flex-row justify-between items-center px-3`}>
              <Text size={18} style={tw`font-bold py-1`}>
                {currentTab.title}
              </Text>
              <Pressable
                style={tw`bg-sky-500 justify-center items-center rounded px-3 py-1`}
                onPress={onToggleVisibleTabs}>
                <Text size={12} style={tw`text-white`}>
                  Đổi Nguồn Phim
                </Text>
              </Pressable>
            </View>
            {currentTab.children}
          </View>
        )}
        <Modal isVisible={visibleTabs} onBackdropPress={onToggleVisibleTabs}>
          <View>
            <ScrollView
              contentContainerStyle={tw`grow justify-center items-center`}>
              {tabs.map((item, index) => (
                <Pressable key={index} onPress={() => onChangeTab(index)}>
                  <Text size={15} style={tw`text-white font-bold px-3 py-1`}>
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default HomeScreen;
