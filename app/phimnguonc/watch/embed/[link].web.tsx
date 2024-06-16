import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const MovieOPhimWatchEmbed = () => {
  const { link } = useLocalSearchParams();

  return <iframe style={tw`flex-1`} src={`${link}`} />;
};

export default MovieOPhimWatchEmbed;
