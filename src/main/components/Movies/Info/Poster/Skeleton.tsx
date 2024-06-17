import { layout } from "@/src/core/layout";
import tw from "@/src/core/tailwind";
import Skeleton from "@/src/main/base/Skeleton/Skeleton";
import React from "react";

const MoviesInfoPosterSkeleton = () => {
  return (
    <Skeleton
      style={tw`absolute w-full h-[${(layout.window.height / 6) * 2}px] top-0 left-0`}
    />
  );
};

export default MoviesInfoPosterSkeleton;
