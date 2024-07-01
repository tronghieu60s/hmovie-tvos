import tw from "@/src/core/tailwind";
import IconSax from "@/src/main/base/IconSax";
import { useTouchable, withTouchable } from "@/src/main/base/Touchable";
import * as DefaultIconSax from "iconsax-react-native";
import React from "react";
import { View } from "react-native";

type Props = {
  active: boolean;
  iconName: keyof typeof DefaultIconSax;
};

const DefaultLeftTabBarButton = (props: Props) => {
  const { active, iconName } = props;

  const { hasFocus } = useTouchable();

  return (
    <View
      style={[
        tw`items-center justify-center border-2 border-transparent rounded p-3`,
        active && tw`bg-transparent border-sky-500`,
        hasFocus && tw`bg-sky-500`,
      ]}>
      <IconSax
        name={iconName}
        color={hasFocus ? tw.color("white") : tw.color("black")}
        size={20}
      />
    </View>
  );
};

const LeftTabBarButton = withTouchable(DefaultLeftTabBarButton);

export default LeftTabBarButton;
