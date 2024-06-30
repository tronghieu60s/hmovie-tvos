import tw from "@/src/core/tailwind";
import IconSax from "@/src/main/base/IconSax";
import { Text } from "@/src/main/base/Native/Text";
import { useTouchable, withTouchable } from "@/src/main/base/Touchable";
import React from "react";
import { View } from "react-native";

const DefaultButtonWatchNow = () => {
  const { hasFocus } = useTouchable();

  return (
    <View
      style={[
        tw`flex-row items-center justify-center gap-2 p-2.5 web:p-1.5 px-4 bg-gray-800 rounded`,
        hasFocus && tw`bg-gray-600`,
      ]}>
      <IconSax name="Play" size={18} color="#FFFFFF" style={tw`web:mt-0.5`} />
      <Text size={13} style={tw`font-medium text-white`}>
        Xem Ngay
      </Text>
    </View>
  );
};

const ButtonWatchNow = withTouchable(DefaultButtonWatchNow);

export default ButtonWatchNow;
