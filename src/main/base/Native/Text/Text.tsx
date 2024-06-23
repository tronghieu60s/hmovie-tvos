import { layout } from "@/src/core/layout";
import { BREAKPOINT_RESPONSIVE_XL } from "@/src/core/responsive/breakpoints";
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
      style={[
        tw`text-[${s(size)}px]`,
        tw`sm:text-[${s(size - 5)}px]`,
        tw`web:xl:text-[${size + 2}px]`,
        style,
      ]}
      {...restProps}>
      {contentText}
    </DefaultText>
  );
};

export const getFontSize = (size: number) => {
  if (layout.window.width > BREAKPOINT_RESPONSIVE_XL) {
    return size + 2;
  }

  return s(size);
};
