import { isTVPlatform } from "@/src/core/config";
import tw from "@/src/core/tailwind";
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
    children: JSX.Element;
  }[];
  visibleSwitchTabs: boolean;
  onChangeVisibleSwitchTabs: (visible: boolean) => void;
};

const HomeTabsSwitch = (props: Props) => {
  const { tabs, visibleSwitchTabs, onChangeVisibleSwitchTabs } = props;

  const onChangeTab = useCallback(
    (index: number) => {
      router.setParams({ tab: `${index}`, page: `1` });
      onChangeVisibleSwitchTabs(false);
    },
    [onChangeVisibleSwitchTabs],
  );

  return (
    <View style={tw`relative`}>
      <TabsSwitchButton onPress={() => onChangeVisibleSwitchTabs(true)} />
      {isTVPlatform && (
        <Portal>
          {visibleSwitchTabs && (
            <View style={tw`absolute top-0 bottom-0 left-0 right-0 z-10`}>
              <View style={tw`absolute w-full h-full bg-black opacity-85`} />
              <ScrollView
                contentContainerStyle={tw`grow justify-center items-center gap-3`}>
                {tabs.map((item, index) => (
                  <TabsSwitchItem
                    key={index}
                    onPress={() => onChangeTab(index)}
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
          isVisible={visibleSwitchTabs}
          onBackdropPress={() => onChangeVisibleSwitchTabs(false)}>
          <View>
            <ScrollView
              contentContainerStyle={tw`grow justify-center items-center gap-3`}>
              {tabs.map((item, index) => (
                <TabsSwitchItem
                  key={index}
                  onPress={() => onChangeTab(index)}
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
