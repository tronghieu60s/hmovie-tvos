import tw from "@/src/core/tailwind";
import MoviesOPhimInfo from "@/src/main/components/Movies/OPhim/Info";
import React from "react";
import { View } from "react-native";

const MovieOPhim = () => {
  return (
    <View style={[tw`grow bg-white`]}>
      <MoviesOPhimInfo />
    </View>
  );
};

export default MovieOPhim;
