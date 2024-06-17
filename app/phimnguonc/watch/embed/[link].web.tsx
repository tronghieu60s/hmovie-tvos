import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

const MovieOPhimWatchEmbed = () => {
  const { link } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);

  return (
    <View style={tw`flex-1`}>
      <iframe
        style={tw`flex-1 border-0`}
        src={`${link}`}
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

export default MovieOPhimWatchEmbed;
