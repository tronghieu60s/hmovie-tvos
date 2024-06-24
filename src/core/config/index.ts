import { Platform } from "react-native";
import { layout } from "../layout";
import { BREAKPOINT_RESPONSIVE_SM } from "../responsive/breakpoints";

export const isDev = __DEV__;
export const appApiUrl = process.env.EXPO_PUBLIC_APP_API_URL;

export const isTVPlatform = Platform.isTV;
export const isWebPlatform = Platform.OS === "web";
export const isMobilePlatform =
  Platform.OS === "ios" ||
  Platform.OS === "android" ||
  (Platform.OS === "web" && layout.window.width < BREAKPOINT_RESPONSIVE_SM);
export const notMobilePlatform = Platform.OS === "web" || Platform.isTV;
