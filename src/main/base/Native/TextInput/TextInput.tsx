import tw from "@/src/core/tailwind";
import React, { forwardRef } from "react";
import {
  Animated,
  TextInput as DefaultTextInput,
  TextInputProps as DefaultTextInputProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { s } from "react-native-size-matters";

export type TextInputProps = DefaultTextInputProps & {
  size?: number;
  style?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
  children?: React.ReactNode;
};

const RootTextInput = (
  props: TextInputProps,
  ref?: React.LegacyRef<DefaultTextInput>,
) => {
  const { size = 14, style, children, ...restProps } = props;

  return (
    <DefaultTextInput
      ref={ref}
      style={[tw`text-[${s(size)}px] sm:text-[${s(size - 5)}px]`, style]}
      {...restProps}
    />
  );
};

export const TextInput = forwardRef(RootTextInput);
