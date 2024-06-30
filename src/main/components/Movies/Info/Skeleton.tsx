import tw from "@/src/core/tailwind";
import Back from "@/src/main/base/NativeTv/Back";
import Skeleton from "@/src/main/base/Skeleton/Skeleton";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  height: number;
};

const MoviesInfoSkeleton = (props: Props) => {
  const { height } = props;

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View>
      <Skeleton
        style={tw`absolute w-full h-[${scale(250)}px] top-0 left-0 sm:hidden`}
      />
      <ScrollView
        overScrollMode="never"
        style={tw`h-[${height}px]`}
        contentContainerStyle={[tw`grow`, insets.paddingTop === 0 && tw`pt-3`]}
        showsVerticalScrollIndicator={false}>
        <View style={tw`gap-3 mt-[${scale(180)}px] sm:mt-0`}>
          <View style={tw`flex-row items-center gap-2 px-2 hidden sm:flex`}>
            <Back onPress={() => router.back()} hasTVPreferredFocus />
            <Skeleton style={tw`w-[${scale(150)}px] h-full rounded`} />
          </View>
          <View style={tw`flex-row items-end gap-2.5 px-2.5`}>
            <Skeleton
              style={[
                tw`rounded`,
                tw`w-[${scale(100)}px] h-[${scale(140)}px]`,
                tw`sm:w-[${scale(80)}px] sm:h-[${scale(110)}px]`,
              ]}
            />
            <Skeleton style={tw`flex-1 h-full rounded`} />
          </View>
          <View style={tw`bg-white`}>
            <View style={tw`gap-3 p-3`}>
              <Skeleton style={tw`h-[${scale(18)}px] rounded`} />
              <Skeleton style={tw`h-[${scale(30)}px] rounded`} />
            </View>
            <View style={tw`gap-3 p-3`}>
              <Skeleton style={tw`h-[${scale(18)}px] rounded`} />
              <Skeleton style={tw`h-[${scale(120)}px] rounded`} />
            </View>
            <View style={tw`gap-3 p-3`}>
              <Skeleton style={tw`h-[${scale(18)}px] rounded`} />
              <Skeleton style={tw`h-[${scale(30)}px] rounded`} />
            </View>
            <View style={tw`gap-3 p-3`}>
              <Skeleton style={tw`h-[${scale(18)}px] rounded`} />
              <Skeleton style={tw`h-[${scale(30)}px] rounded`} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MoviesInfoSkeleton;
