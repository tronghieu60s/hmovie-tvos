import tw from "@/src/core/tailwind";
import { useConsole } from "@/src/main/hooks/useConsole";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";
import { RecoilRoot } from "recoil";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  useConsole();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <ActionSheetProvider>
        <View style={tw`grow`}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </View>
      </ActionSheetProvider>
    </RecoilRoot>
  );
};

export default RootLayout;
