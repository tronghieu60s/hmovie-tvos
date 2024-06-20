import tw from "@/src/core/tailwind";
import React from "react";
import {
  Animated,
  Text as DefaultText,
  TextProps as DefaultTextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { s } from "react-native-size-matters";

export type TextProps = DefaultTextProps & {
  text?: string;
  size?: number;
  style?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
  children?: React.ReactNode;
};

export const Text = (props: TextProps) => {
  const { text, size = 14, style, children, ...restProps } = props;

  const contentText = text || children;

  return (
    <DefaultText
      style={[tw`text-[${s(size)}px] web:xl:text-[${size + 2}px]`, style]}
      {...restProps}>
      {contentText}
    </DefaultText>
  );
};
