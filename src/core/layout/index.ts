import { Dimensions } from "react-native";
import { s } from "react-native-size-matters";
import { isTVPlatform } from "../config";

const { width, height } = Dimensions.get("window");

export const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  widthLeftTabBar: isTVPlatform ? s(45) : 0,
};
