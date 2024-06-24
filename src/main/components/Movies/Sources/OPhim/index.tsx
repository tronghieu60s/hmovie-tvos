import tw from "@/src/core/tailwind";
import { movieInfoOPhimState } from "@/src/main/recoil/movie/ophim/selectors";
import { MovieType } from "@/src/main/recoil/movie/ophim/types";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { useRecoilValueLoadable } from "recoil";
import MoviesError from "../../Error";
import MoviesInfoSkeleton from "../../Info/Skeleton";
import MoviesOPhimInfo from "./Info";

const MoviesInfoOPhim = () => {
  const { slug } = useLocalSearchParams();

  const { state, contents: contentsMovie } = useRecoilValueLoadable(
    movieInfoOPhimState(`${slug}`),
  );
  const [wrapperLayout, setWrapperLayout] = useState({ width: 0, height: 0 });

  const movie = contentsMovie as MovieType;

  const onWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWrapperLayout({ width, height });
  }, []);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`grow`} onLayout={onWrapperLayout}>
        {state === "loading" && (
          <MoviesInfoSkeleton height={wrapperLayout.height} />
        )}
        {state === "hasValue" && (
          <MoviesOPhimInfo movie={movie} height={wrapperLayout.height} />
        )}
        {state === "hasError" && <MoviesError />}
      </View>
    </View>
  );
};

export default MoviesInfoOPhim;
