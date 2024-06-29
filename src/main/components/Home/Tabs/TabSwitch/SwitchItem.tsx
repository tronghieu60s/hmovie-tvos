import tw from "@/src/core/tailwind";
import { Text } from "@/src/main/base/Native/Text";
import { useTouchable, withTouchable } from "@/src/main/base/Touchable";
import React from "react";
import { View, ViewProps } from "react-native";

type Props = ViewProps;

const DefaultTabsSwitchItem = (props: Props) => {
  const { children } = props;

  const { hasFocus } = useTouchable();

  return (
    <View style={[tw`rounded-md px-2 pt-1 pb-0.5`, hasFocus && tw`bg-sky-500`]}>
      <Text size={15} style={tw`text-white font-bold`}>
        {typeof children === "string" ? children : null}
      </Text>
    </View>
  );
};

const TabsSwitchItem = withTouchable(DefaultTabsSwitchItem);

export default TabsSwitchItem;
