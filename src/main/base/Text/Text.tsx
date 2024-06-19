import { isTVPlatform, isWebPlatform } from "@/src/core/config";
import React, { useMemo } from "react";
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

  const fontSize = useMemo(() => {
    if (!size) return undefined;

    if (isTVPlatform || isWebPlatform) {
      return scale(size - 4);
    }

    return scale(size);
  }, [size]);

  return (
    <DefaultText style={[{ fontSize }, style]} {...restProps}>
      {contentText}
    </DefaultText>
  );
};
