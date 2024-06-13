import tw from "@/src/core/tailwind";
import { movieOPhimInfoState } from "@/src/main/recoil/movie/ophim/selectors";
import { Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useRecoilValue } from "recoil";

const MoviesOPhimInfo = () => {
  const { slug } = useLocalSearchParams();
  const movie = useRecoilValue(movieOPhimInfoState(`${slug}`));

  return (
    <View style={tw`flex-1`}>
      <Video />
    </View>
  );
};

export default MoviesOPhimInfo;
