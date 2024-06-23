import tw from "@/src/core/tailwind";
import Skeleton from "@/src/main/base/Skeleton/Skeleton";
import React from "react";
import { s, scale } from "react-native-size-matters";

type Props = {
  perItemSize?: number;
};

const MoviesItemPortraitSkeleton = (props: Props) => {
  const { perItemSize = scale(100) } = props;

  return (
    <Skeleton
      style={tw`w-[${perItemSize - 0.15}px] h-[${perItemSize + 50 + s(18)}px]`}
    />
  );
};

export default MoviesItemPortraitSkeleton;
