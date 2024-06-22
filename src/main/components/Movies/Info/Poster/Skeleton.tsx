import tw from "@/src/core/tailwind";
import Skeleton from "@/src/main/base/Skeleton/Skeleton";
import React from "react";
import { scale } from "react-native-size-matters";

const MoviesInfoPosterSkeleton = () => {
  return (
    <Skeleton style={tw`absolute w-full h-[${scale(250)}px] top-0 left-0`} />
  );
};

export default MoviesInfoPosterSkeleton;
