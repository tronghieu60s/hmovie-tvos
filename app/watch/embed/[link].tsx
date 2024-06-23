import tw from "@/src/core/tailwind";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

const MovieOPhimWatchEmbed = () => {
  const { link } = useLocalSearchParams();

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={[tw`flex-1`, insets]}>
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
    </View>
  );
};

export default MovieOPhimWatchEmbed;
