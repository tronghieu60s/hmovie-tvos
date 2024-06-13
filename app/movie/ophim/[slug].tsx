import tw from "@/src/core/tailwind";
import MoviesOPhimInfo from "@/src/main/components/Movies/OPhim/Info";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const MovieOPhim = () => {
  const { slug } = useLocalSearchParams();

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={[tw`grow bg-white`, insets]}>
      <MoviesOPhimInfo />
    </View>
  );
};

export default MovieOPhim;
