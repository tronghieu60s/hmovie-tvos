import tw from "@/src/core/tailwind";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { useRecoilValueLoadable } from "recoil";
import MoviesInfoItem from "./Item";
import MoviesError from "../Error";
import MoviesInfoSkeleton from "./Skeleton";
import { movieInfoState } from "@/src/main/recoil/movie/selectors";
import { MovieSource } from "@/src/main/recoil/movie/types";

const MoviesInfo = () => {
  const { slug = "", source: _source } = useLocalSearchParams();
  const source = _source as MovieSource;

  const { state, contents: movie } = useRecoilValueLoadable(
    movieInfoState({ slug: `${slug}`, source }),
  );
  const [wrapperLayout, setWrapperLayout] = useState({ width: 0, height: 0 });

  const onWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWrapperLayout({ width, height });
  }, []);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`grow`} onLayout={onWrapperLayout}>
        {state === "hasValue" && (
          <MoviesInfoItem movie={movie} height={wrapperLayout.height} />
        )}
        {state === "loading" && (
          <MoviesInfoSkeleton height={wrapperLayout.height} />
        )}
        {state === "hasError" && <MoviesError />}
      </View>
    </View>
  );
};

export default MoviesInfo;
