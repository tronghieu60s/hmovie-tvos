import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { WebView } from "react-native-webview";

const MovieOPhimWatchEmbed = () => {
  const { link } = useLocalSearchParams();

  return <WebView style={tw`flex-1`} source={{ uri: `${link}` }} />;
};

export default MovieOPhimWatchEmbed;
