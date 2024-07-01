import { Platform } from "react-native";

export const isDev = __DEV__;
export const isTVPlatform = Platform.isTV;
export const isWebPlatform = Platform.OS === "web";
export const isMobilePlatform =
  Platform.OS === "ios" || Platform.OS === "android";
