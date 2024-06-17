import tw from "@/src/core/tailwind";
import Skeleton from "@/src/main/base/Skeleton/Skeleton";
import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

const MoviesInfoSkeleton = () => {
  return (
    <View style={tw`bg-white`}>
      <View style={tw`gap-3 p-3`}>
        <Skeleton style={tw`h-[${scale(18)}px]`} />
        <Skeleton style={tw`h-[${scale(30)}px]`} />
      </View>
      <View style={tw`gap-3 p-3`}>
        <Skeleton style={tw`h-[${scale(18)}px]`} />
        <Skeleton style={tw`h-[${scale(120)}px]`} />
      </View>
      <View style={tw`gap-3 p-3`}>
        <Skeleton style={tw`h-[${scale(18)}px]`} />
        <Skeleton style={tw`h-[${scale(30)}px]`} />
      </View>
      <View style={tw`gap-3 p-3`}>
        <Skeleton style={tw`h-[${scale(18)}px]`} />
        <Skeleton style={tw`h-[${scale(30)}px]`} />
      </View>
    </View>
  );
};

export default MoviesInfoSkeleton;
