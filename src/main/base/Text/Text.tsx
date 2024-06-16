import React from "react";
import {
  Animated,
  Text as DefaultText,
  TextProps as DefaultTextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { scale } from "react-native-size-matters";

export type TextProps = DefaultTextProps & {
  text?: string;
  size?: number;
  style?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
  children?: React.ReactNode;
};

export const Text = (props: TextProps) => {
  const { text, size, style, children, ...restProps } = props;

  const contentText = text || children;

  return (
    <DefaultText
      style={[{ ...(size && { fontSize: scale(size) }) }, style]}
      {...restProps}>
      {contentText}
    </DefaultText>
  );
};
