import tw from "@/src/core/tailwind";
import React from "react";
import { StyleProp, TextStyle, View, ViewProps } from "react-native";
import { Text } from "../../Text";
import { scale } from "react-native-size-matters";
import { Animated } from "react-native";

type SizeType = "xs" | "sm" | number;

type ColorType =
  | "info"
  | "gray"
  | "failure"
  | "success"
  | "warning"
  | "indigo"
  | "purple"
  | "pink";

export type BadgeProps = ViewProps & {
  size?: SizeType;
  color?: ColorType;
  label?: string;
  textStyle?: StyleProp<TextStyle | Animated.AnimatedProps<TextStyle>>;
};

const getSize = (size: SizeType) => {
  if (size === "xs") {
    return `text-[${scale(10)}px]`;
  }
  if (size === "sm") {
    return `text-[${scale(12)}px]`;
  }
  return `text-[${scale(size)}px]`;
};

const getColor = (color: ColorType) => {
  if (color === "info") {
    return "bg-blue-100 text-blue-800";
  } else if (color === "gray") {
    return "bg-gray-100 text-gray-800";
  } else if (color === "failure") {
    return "bg-red-100 text-red-800";
  } else if (color === "success") {
    return "bg-green-100 text-green-800";
  } else if (color === "warning") {
    return "bg-yellow-100 text-yellow-800";
  } else if (color === "indigo") {
    return "bg-indigo-100 text-indigo-800";
  } else if (color === "purple") {
    return "bg-purple-100 text-purple-800";
  } else if (color === "pink") {
    return "bg-pink-100 text-pink-800";
  }
  return color;
};

export const Badge = (props: BadgeProps) => {
  const {
    size = "xs",
    color = "info",
    label,
    style,
    textStyle,
    children,
    ...restProps
  } = props;

  return (
    <View
      style={[
        tw`${getColor(color)}`,
        tw`font-medium px-2.5 py-0.5 rounded`,
        style,
      ]}
      {...restProps}>
      {label && (
        <Text style={[tw`${getSize(size)}`, tw`${getColor(color)}`, textStyle]}>
          {label}
        </Text>
      )}
      {!label && children}
    </View>
  );
};
