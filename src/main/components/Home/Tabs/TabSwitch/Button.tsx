import tw from "@/src/core/tailwind";
import { Text } from "@/src/main/base/Native/Text";
import { useTouchable, withTouchable } from "@/src/main/base/Touchable";
import React from "react";
import { View } from "react-native";

const DefaultTabsSwitchButton = () => {
  const { hasFocus } = useTouchable();

  return (
    <View
      style={[
        tw`bg-black justify-center items-center rounded border-2 px-3 py-1`,
        hasFocus && tw`bg-white border-black`,
      ]}>
      <Text size={12} style={[tw`text-white`, hasFocus && tw`text-black`]}>
        Đổi Nguồn Phim
      </Text>
    </View>
  );
};

const TabsSwitchButton = withTouchable(DefaultTabsSwitchButton);

export default TabsSwitchButton;
