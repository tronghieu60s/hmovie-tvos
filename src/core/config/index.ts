import { Platform } from "react-native";

export const isDev = __DEV__;
export const appApiUrl = process.env.EXPO_PUBLIC_APP_API_URL;
export const notMobilePlatform = Platform.OS === "web" || Platform.isTV;
