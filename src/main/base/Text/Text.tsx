import React from "react";
import { Animated, StyleProp, TextStyle } from "react-native";
import { scale } from "react-native-size-matters";
import { Text as DefaultText } from "react-native-ui-lib";

export type TextProps = React.ComponentProps<typeof DefaultText> & {
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
      style={[style, { ...(size && { fontSize: scale(size) }) }]}
      {...restProps}>
      {contentText}
    </DefaultText>
  );
};
