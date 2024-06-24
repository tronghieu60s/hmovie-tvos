import tw from "@/src/core/tailwind";
import Skeleton from "@/src/main/base/Skeleton/Skeleton";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import React from "react";
import { ScrollView, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  height: number;
};

const MoviesInfoSkeleton = (props: Props) => {
  const { height } = props;

  const insets = useSafeAreaInsetsStyle(["bottom"]);

  return (
    <View>
      <Skeleton style={tw`absolute w-full h-[${scale(250)}px] top-0 left-0`} />
      <ScrollView
        overScrollMode="never"
        style={tw`h-[${height}px]`}
        contentContainerStyle={[tw`grow`, insets]}
        showsVerticalScrollIndicator={false}>
        <View style={tw`gap-3 mt-[${scale(180)}px] sm:mt-[${scale(100)}px]`}>
          <View style={tw`flex-row items-end gap-2.5 px-2.5`}>
            <Skeleton
              style={tw`w-[${scale(100)}px] h-[${scale(150)}px] shadow rounded-lg`}
            />
            <Skeleton
              style={tw`flex-1 h-[${scale(110)}px] shadow rounded-lg`}
            />
          </View>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default MoviesInfoSkeleton;
