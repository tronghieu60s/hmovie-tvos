import tw from "@/src/core/tailwind";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { ImageBackground } from "expo-image";
import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  posterUrl: string;
};

const MoviesInfoImagePoster = (props: Props) => {
  const { posterUrl } = props;

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <ImageBackground
      style={tw`absolute w-full h-[${scale(250)}px] sm:h-[${scale(150)}px] top-0 left-0`}
      source={{ uri: posterUrl }}
      contentFit="cover">
      <View style={insets}>
        <View style={tw`flex-row px-3 sm:mt-3`}>
          {/* <Pressable style={tw`bg-gray-400 rounded-full p-2`}>
            <ArrowLeft size={15} color="#FFFFFF" />
          </Pressable> */}
        </View>
      </View>
    </ImageBackground>
  );
};

export default MoviesInfoImagePoster;
