import { isTVPlatform } from "@/src/core/config";
import tw from "@/src/core/tailwind";
import { MovieSource } from "@/src/main/recoil/movie/types";
import { Portal } from "@gorhom/portal";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { ReactNativeModal as Modal } from "react-native-modal";
import TabsSwitchButton from "./Button";
import TabsSwitchItem from "./SwitchItem";

type Props = {
  tabs: {
    title: string;
    source: MovieSource;
  }[];
  visible: boolean;
  onChangeVisible: (visible: boolean) => void;
};

const HomeTabsSwitch = (props: Props) => {
  const { tabs, visible, onChangeVisible } = props;

  const onChangeTab = useCallback(
    (source: MovieSource) => {
      router.setParams({ page: `1`, source });
      onChangeVisible(false);
    },
    [onChangeVisible],
  );

  return (
    <View style={tw`relative`}>
      <TabsSwitchButton onPress={() => onChangeVisible(true)} />
      {isTVPlatform && (
        <Portal>
          {visible && (
            <View style={tw`absolute top-0 bottom-0 left-0 right-0 z-10`}>
              <View style={tw`absolute w-full h-full bg-black opacity-85`} />
              <ScrollView
                contentContainerStyle={tw`grow justify-center items-center gap-3`}>
                {tabs.map((item, index) => (
                  <TabsSwitchItem
                    key={index}
                    onPress={() => onChangeTab(item.source)}
                    hasTVPreferredFocus={index === 0}>
                    {item.title}
                  </TabsSwitchItem>
                ))}
              </ScrollView>
            </View>
          )}
        </Portal>
      )}
      {!isTVPlatform && (
        <Modal
          isVisible={visible}
          onBackdropPress={() => onChangeVisible(false)}>
          <View>
            <ScrollView
              contentContainerStyle={tw`grow justify-center items-center gap-3`}>
              {tabs.map((item, index) => (
                <TabsSwitchItem
                  key={index}
                  onPress={() => onChangeTab(item.source)}
                  hasTVPreferredFocus={index === 0}>
                  {item.title}
                </TabsSwitchItem>
              ))}
            </ScrollView>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default HomeTabsSwitch;
