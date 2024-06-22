import tw from "@/src/core/tailwind";
import React from "react";
import { StyleProp, TextStyle, View, ViewProps } from "react-native";
import { Text } from "../../Text";

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

const sizeScheme = {
  xs: 12,
  sm: 14,
};

const getSize = (size: SizeType) => {
  if (typeof size === "number") {
    return size;
  }

  if (sizeScheme[size]) {
    return sizeScheme[size];
  }
};

const colorScheme = {
  info: "bg-blue-100 text-blue-800",
  gray: "bg-gray-100 text-gray-800",
  failure: "bg-red-100 text-red-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  indigo: "bg-indigo-100 text-indigo-800",
  purple: "bg-purple-100 text-purple-800",
  pink: "bg-pink-100 text-pink-800",
};

const getColor = (color: ColorType) => {
  if (colorScheme[color]) {
    return colorScheme[color];
  }
  return color;
};

export type BadgeProps = ViewProps & {
  size?: SizeType;
  color?: ColorType;
  label?: string;
  textStyle?: StyleProp<TextStyle>;
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
        <Text size={getSize(size)} style={[tw`${getColor(color)}`, textStyle]}>
          {label}
        </Text>
      )}
      {!label && children}
    </View>
  );
};
