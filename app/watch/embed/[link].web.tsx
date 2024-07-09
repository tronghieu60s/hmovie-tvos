import tw from "@/src/core/tailwind";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

const MovieWatchEmbed = () => {
  const { link } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={[tw`flex-1`, insets]}>
      <iframe
        src={`${link}`}
        style={tw`flex-1 border-0`}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color={tw.color("blue-500")}
          style={tw`absolute top-0 right-0 bottom-0 left-0`}
        />
      )}
    </View>
  );
};

export default MovieWatchEmbed;
