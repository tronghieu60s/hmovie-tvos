import tw from "@/src/core/tailwind";
import Skeleton from "@/src/main/base/Skeleton/Skeleton";
import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

const MoviesInfoTopInfoSkeleton = () => {
  return (
    <View style={tw`flex-row items-end gap-2.5 px-2.5`}>
      <Skeleton
        style={tw`w-[${scale(100)}px] h-[${scale(150)}px] shadow rounded-lg`}
      />
      <Skeleton style={tw`flex-1 h-[${scale(110)}px] shadow rounded-lg`} />
    </View>
  );
};

export default MoviesInfoTopInfoSkeleton;
