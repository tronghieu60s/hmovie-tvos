import tw from "@/src/core/tailwind";
import React from "react";
import { View, ViewProps } from "react-native";
import { Text } from "../../Native/Text";
import { useTouchable, withTouchable } from "../../Touchable";

type Props = ViewProps;

const DefaultPaginationButton = (props: Props) => {
  const { children } = props;

  const { hasFocus } = useTouchable();

  return (
    <View
      style={[
        tw`w-25 items-center justify-center px-3 py-1 bg-gray-800 rounded`,
        hasFocus && tw`bg-gray-600`,
      ]}>
      <Text size={13} style={tw`font-medium text-white`}>
        {children}
      </Text>
    </View>
  );
};

const PaginationButton = withTouchable(DefaultPaginationButton);

export default PaginationButton;
