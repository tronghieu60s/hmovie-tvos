import tw from "@/src/core/tailwind";
import MoviesInfoOPhim from "@/src/main/components/Movies/Sources/OPhim";
import React from "react";
import { View } from "react-native";

const MovieOPhim = () => {
  return (
    <View style={[tw`grow bg-white`]}>
      <MoviesInfoOPhim />
    </View>
  );
};

export default MovieOPhim;
