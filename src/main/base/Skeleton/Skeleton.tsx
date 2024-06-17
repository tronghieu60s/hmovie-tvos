import React, { useEffect } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View as DefaultView,
  ViewProps,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const width = Dimensions.get("window").width;
const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export type SkeletonProps = ViewProps & {
  speed?: number;
  highlightColor?: string;
  backgroundColor?: string;
};

export default function Skeleton(props: SkeletonProps) {
  const {
    style,
    speed = 1000,
    highlightColor = "#F2F8FC",
    backgroundColor = "#E1E9EE",
    ...restProps
  } = props;

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    let currentSpeed = speed;
    if (speed < 300) {
      currentSpeed = 300;
    }
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: currentSpeed,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width],
  });

  return (
    <DefaultView
      {...restProps}
      style={[{ overflow: "hidden", backgroundColor }, style]}>
      <AnimatedGradient
        colors={[
          backgroundColor,
          highlightColor,
          backgroundColor,
          highlightColor,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }],
        }}
      />
    </DefaultView>
  );
}
