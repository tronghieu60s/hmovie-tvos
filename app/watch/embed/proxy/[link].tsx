import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

const MovieWatchEmbed = () => {
  const { link } = useLocalSearchParams();

  return (
    <View style={tw`flex-1`}>
      <WebView
        style={tw`flex-1 bg-black`}
        source={{
          html: `<style>* { margin: 0; padding: 0; background-color: #000; }</style>
              <iframe width="100%" height="100%" src="${link}" 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
              </iframe>`,
        }}
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

export default MovieWatchEmbed;
