import tw from "@/src/core/tailwind";
import { Text } from "@/src/main/base/Native/Text";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Modal from "react-native-modal";

type Props = {
  tabs: {
    title: React.JSX.Element;
    children: React.JSX.Element;
  }[];
};

const HomeTabsSwitch = (props: Props) => {
  const { tabs } = props;

  const [visibleTabs, setVisibleTabs] = useState(false);

  const onChangeTab = useCallback((index: number) => {
    router.setParams({ tab: `${index}`, page: `1` });
    setVisibleTabs(false);
  }, []);

  const onToggleVisibleTabs = useCallback(() => {
    setVisibleTabs((prev) => !prev);
  }, []);

  return (
    <View>
      <Pressable
        style={tw`bg-black justify-center items-center rounded px-3 py-1`}
        onPress={onToggleVisibleTabs}>
        <Text size={12} style={tw`text-white`}>
          Đổi Nguồn Phim
        </Text>
      </Pressable>
      <Modal isVisible={visibleTabs} onBackdropPress={onToggleVisibleTabs}>
        <View>
          <ScrollView
            contentContainerStyle={tw`grow justify-center items-center gap-3`}>
            {tabs.map((item, index) => (
              <Pressable key={index} onPress={() => onChangeTab(index)}>
                {item.title}
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default HomeTabsSwitch;
