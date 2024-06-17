import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const MoviePhimNguonCWatchEmbed = () => {
  const { link } = useLocalSearchParams();

  return (
    <WebView
      style={tw`flex-1`}
      source={{ uri: `${link}` }}
      renderLoading={() => (
        <ActivityIndicator
          size="large"
          color={tw.color("blue-500")}
          style={tw`absolute top-0 right-0 bottom-0 left-0`}
        />
      )}
      startInLoadingState
    />
  );
};

export default MoviePhimNguonCWatchEmbed;
