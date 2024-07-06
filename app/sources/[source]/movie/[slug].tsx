import tw from "@/src/core/tailwind";
import MoviesInfo from "@/src/main/components/Movies/Info";
import React from "react";
import { View } from "react-native";

const MovieSourceMovie = () => {
  return (
    <View style={[tw`grow bg-white`]}>
      <MoviesInfo />
    </View>
  );
};

export default MovieSourceMovie;
