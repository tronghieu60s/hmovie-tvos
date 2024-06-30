import tw from "@/src/core/tailwind";
import { ImageBackground } from "expo-image";
import React from "react";
import { ViewProps } from "react-native";
import { scale } from "react-native-size-matters";

type Props = ViewProps & {
  posterUrl: string;
};

const MoviesInfoImagePoster = (props: Props) => {
  const { style, posterUrl, ...restProps } = props;

  return (
    <ImageBackground
      style={[
        tw`absolute w-full sm:w-1/2 h-[${scale(250)}px] sm:h-[${scale(150)}px] top-0 left-0`,
        style,
      ]}
      source={{ uri: posterUrl }}
      contentFit="cover"
      {...restProps}
    />
  );
};

export default MoviesInfoImagePoster;
