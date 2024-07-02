import { isMobilePlatform } from "@/src/core/config";
import tw from "@/src/core/tailwind";
import React from "react";
import { View } from "react-native";
import MoviesItemPortraitSkeleton from "./Item/Skeleton";

type Props = {
  gapSize: number;
  perItemSize: number;
  numberOfItems: number;
};

const MoviesListPortraitSkeleton = (props: Props) => {
  const { gapSize, perItemSize, numberOfItems } = props;

  const numberOfItemsSkeleton = [
    ...Array(numberOfItems * (isMobilePlatform ? 4 : 2)),
  ];

  return (
    <View style={tw`py-3 gap-3`}>
      <View style={tw`flex-row flex-wrap gap-[${gapSize}px]`}>
        {numberOfItemsSkeleton.map((_, index) => (
          <MoviesItemPortraitSkeleton key={index} perItemSize={perItemSize} />
        ))}
      </View>
    </View>
  );
};

export default MoviesListPortraitSkeleton;
