import { delay } from "@/src/core/commonFuncs";
import { isMobilePlatform } from "@/src/core/config";
import "@/src/core/logs/console";
import tw from "@/src/core/tailwind";
import SplashScreen from "@/src/main/components/Splash";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { PortalProvider } from "@gorhom/portal";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import * as ExpoSplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Platform, View, useColorScheme } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { RecoilRoot } from "recoil";
import { useDeviceContext } from "twrnc";

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, setLoaded] = useState(false);
  const [loadedFonts] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useDeviceContext(tw);
  const colorScheme = useColorScheme();

  const onInitial = useCallback(async () => {
    if (!loadedFonts) {
      return;
    }

    if (Platform.OS === "web") {
      await delay(2000);
    }

    console.log(`Theme: ${colorScheme}`);
    ExpoSplashScreen.hideAsync();

    if (isMobilePlatform && !Platform.isTV) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    }

    setLoaded(true);
  }, [colorScheme, loadedFonts]);

  useEffect(() => {
    onInitial();
  }, [onInitial]);

  if (!loaded || !loadedFonts) {
    return <SplashScreen />;
  }

  return (
    <RecoilRoot>
      <ToastProvider>
        <PortalProvider>
          <ActionSheetProvider>
            <View style={tw`grow`}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
              </Stack>
              <StatusBar style="auto" />
            </View>
          </ActionSheetProvider>
        </PortalProvider>
      </ToastProvider>
    </RecoilRoot>
  );
};

export default RootLayout;
