import tw from "@/src/core/tailwind";
import { movieInfoPhimNguonCState } from "@/src/main/recoil/movie/phimnguonc/selectors";
import { MovieType } from "@/src/main/recoil/movie/phimnguonc/types";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { useRecoilValueLoadable } from "recoil";
import MoviesError from "../../Error";
import MoviesInfoSkeleton from "../../Info/Skeleton";
import MoviesPhimNguonCInfo from "./Info";

const MoviesInfoPhimNguonC = () => {
  const { slug } = useLocalSearchParams();

  const { state, contents: contentsMovie } = useRecoilValueLoadable(
    movieInfoPhimNguonCState(`${slug}`),
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
          <MoviesPhimNguonCInfo movie={movie} height={wrapperLayout.height} />
        )}
        {state === "hasError" && <MoviesError />}
      </View>
    </View>
  );
};

export default MoviesInfoPhimNguonC;
