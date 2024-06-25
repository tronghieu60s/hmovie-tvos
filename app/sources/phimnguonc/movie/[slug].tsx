import tw from "@/src/core/tailwind";
import MoviesInfoPhimNguonC from "@/src/main/components/Movies/Sources/PhimNguonC";
import React from "react";
import { View } from "react-native";

const MoviePhimNguonC = () => {
  return (
    <View style={[tw`grow bg-white`]}>
      <MoviesInfoPhimNguonC />
    </View>
  );
};

export default MoviePhimNguonC;
