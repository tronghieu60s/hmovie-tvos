import { delay } from "@/src/core/commonFuncs";
import "@/src/core/logs/console";
import tw from "@/src/core/tailwind";
import SplashScreen from "@/src/main/components/Splash";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as ExpoSplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Platform, View, useColorScheme } from "react-native";
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

  useEffect(() => {
    (async () => {
      if (loadedFonts) {
        console.log(`Theme: ${colorScheme}`);
        ExpoSplashScreen.hideAsync();

        if (Platform.OS === "web") {
          await delay(2000);
        }
        setLoaded(true);
      }
    })();
  }, [colorScheme, loadedFonts]);

  if (!loaded || !loadedFonts) {
    return <SplashScreen />;
  }

  return (
    <RecoilRoot>
      <ActionSheetProvider>
        <View style={tw`grow`}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
          <StatusBar style="auto" />
        </View>
      </ActionSheetProvider>
    </RecoilRoot>
  );
};

export default RootLayout;
