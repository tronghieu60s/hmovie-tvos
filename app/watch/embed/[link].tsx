import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

const MovieWatchEmbedProxy = () => {
  const { link } = useLocalSearchParams();

  return (
    <View style={tw`flex-1`}>
      <WebView
        style={tw`flex-1 bg-black`}
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
      <StatusBar hidden />
    </View>
  );
};

export default MovieWatchEmbedProxy;
