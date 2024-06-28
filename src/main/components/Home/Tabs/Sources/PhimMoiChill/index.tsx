import { calculateListItemStyle } from "@/src/core/commonFuncs";
import tw from "@/src/core/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { useRecoilValueLoadable } from "recoil";
import { useSafeAreaInsetsStyle } from "../../../../../hooks/useSafeAreaInsetsStyle";
import { moviesPhimMoiChillState } from "../../../../../recoil/home/selectors";
import MoviesError from "../../../../Movies/Error";
import MoviesListPortrait from "../../../../Movies/List/Portrait";
import MoviesListPortraitSkeleton from "../../../../Movies/List/Portrait/Skeleton";

const HomeTabPhimMoiChill = () => {
  const { page = 1 } = useLocalSearchParams();

  const { state, contents: movies } = useRecoilValueLoadable(
    moviesPhimMoiChillState({ page: Number(page), limit: 24 }),
  );
  const [wrapperLayout, setWrapperLayout] = useState({ width: 0, height: 0 });

  const onPageChange = useCallback((page: number) => {
    router.setParams({ page: `${page}` });
  }, []);

  const onWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWrapperLayout({ width, height });
  }, []);

  const insets = useSafeAreaInsetsStyle(["bottom"]);

  const listItemStyle = useMemo(
    () => calculateListItemStyle(wrapperLayout.width),
    [wrapperLayout.width],
  );

  return (
    <View style={tw`flex-1 px-3`}>
      <View style={tw`grow`} onLayout={onWrapperLayout}>
        <ScrollView
          overScrollMode="never"
          style={tw`h-[${wrapperLayout.height}px]`}
          contentContainerStyle={[tw`grow`, insets]}
          showsVerticalScrollIndicator={false}>
          {state === "hasValue" && (
            <MoviesListPortrait
              movies={movies}
              gapSize={listItemStyle.gapSize}
              perItemSize={listItemStyle.perItemSize}
              onPageChange={onPageChange}
            />
          )}
          {state === "loading" && (
            <MoviesListPortraitSkeleton
              gapSize={listItemStyle.gapSize}
              perItemSize={listItemStyle.perItemSize}
              numberOfItems={listItemStyle.numberOfItems}
            />
          )}
          {state === "hasError" && <MoviesError />}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeTabPhimMoiChill;
