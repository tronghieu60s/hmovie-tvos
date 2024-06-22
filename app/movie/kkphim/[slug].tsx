import tw from "@/src/core/tailwind";
import MoviesInfoKKPhim from "@/src/main/components/Movies/Sources/KKPhim";
import React from "react";
import { View } from "react-native";

const MovieKKPhim = () => {
  return (
    <View style={[tw`grow bg-white`]}>
      <MoviesInfoKKPhim />
    </View>
  );
};

export default MovieKKPhim;
