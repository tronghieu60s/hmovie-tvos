import { layout } from "@/src/core/layout";
import tw from "@/src/core/tailwind";
import { Tabs } from "@/src/main/base/Flowbite/Tabs";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { MovieType } from "@/src/main/recoil/movie/ophim/types";
import { movieInfoPhimNguonCState } from "@/src/main/recoil/movie/phimnguonc/selectors";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { scale } from "react-native-size-matters";
import { useRecoilValueLoadable } from "recoil";
import MoviesInfoEpisodes from "../../Info/Episodes";
import MoviesInfoPoster from "../../Info/Poster";
import MoviesPhimNguonCAbout from "./About";
import MoviesPhimNguonCTopInfo from "./TopInfo";

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

  const insets = useSafeAreaInsetsStyle(["bottom"]);

  if (state === "loading" || state === "hasError") {
    return null;
  }

  return (
    <View style={tw`flex-1`}>
      <View style={tw`grow`} onLayout={onWrapperLayout}>
        <MoviesInfoPoster posterUrl={movie.posterUrl} />
        <ScrollView
          overScrollMode="never"
          style={tw`h-[${wrapperLayout.height}px]`}
          contentContainerStyle={[tw`grow`, insets]}
          showsVerticalScrollIndicator={false}>
          {state === "hasValue" && (
            <View
              style={tw`gap-3 mt-[${(layout.window.height / 6) * 2 - 100}px]`}>
              <MoviesPhimNguonCTopInfo movie={movie} />
              <View style={tw`bg-white`}>
                <Tabs
                  items={[
                    {
                      title: "Thông tin",
                      children: <MoviesPhimNguonCAbout movie={movie} />,
                    },
                    {
                      title: "Xem phim",
                      children: (
                        <MoviesInfoEpisodes
                          source={movie.source}
                          episodes={movie.episodes}
                        />
                      ),
                    },
                  ]}
                  titleStyle={tw`text-[${scale(12)}px]`}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MoviesInfoPhimNguonC;
