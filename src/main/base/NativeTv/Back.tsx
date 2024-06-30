import React from "react";
import { View } from "react-native";
import IconSax from "../IconSax";
import tw from "@/src/core/tailwind";
import { useTouchable, withTouchable } from "../Touchable";

const DefaultBack = () => {
  const { hasFocus } = useTouchable();

  return (
    <View style={[tw`p-1.5 rounded-full`, hasFocus && tw`bg-gray-600`]}>
      <IconSax name="ArrowLeft" size={18} color={tw.color("black")} />
    </View>
  );
};

const Back = withTouchable(DefaultBack);

export default Back;
