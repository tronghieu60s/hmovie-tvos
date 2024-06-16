import { layout } from "@/src/core/layout";
import tw from "@/src/core/tailwind";
import { ImageBackground } from "expo-image";
import React from "react";

type Props = {
  posterUrl: string;
};

const MoviesInfoPoster = (props: Props) => {
  const { posterUrl } = props;

  return (
    <ImageBackground
      style={tw`absolute w-full h-[${(layout.window.height / 6) * 2}px] top-0 left-0`}
      source={{ uri: posterUrl }}
      contentFit="cover"></ImageBackground>
  );
};

export default MoviesInfoPoster;
