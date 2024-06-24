import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import tw from "@/src/core/tailwind";

const SplashScreen = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <Image
        style={tw`w-full h-full`}
        source={require("@/assets/images/logo/logo_full_light.svg")}
        contentFit="contain"
      />
    </View>
  );
};

export default SplashScreen;
