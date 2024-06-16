import { layout } from "@/src/core/layout";
import tw from "@/src/core/tailwind";
import { Tabs } from "@/src/main/base/Flowbite/Tabs";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { movieInfoOPhimState } from "@/src/main/recoil/movie/ophim/selectors";
import { MovieType } from "@/src/main/recoil/movie/ophim/types";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { scale } from "react-native-size-matters";
import { useRecoilValueLoadable } from "recoil";
import MoviesInfoEpisodes from "../../Info/Episodes";
import MoviesInfoPoster from "../../Info/Poster";
import MoviesOPhimAbout from "./About";
import MoviesOPhimTopInfo from "./TopInfo";

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
            <View style={tw`grow`}>
              <View
                style={tw`grow gap-3 mt-[${(layout.window.height / 6) * 2 - 100}px]`}>
                <MoviesOPhimTopInfo movie={movie} />
                <View style={tw`grow bg-white`}>
                  <Tabs
                    items={[
                      {
                        title: "Thông tin",
                        children: <MoviesOPhimAbout movie={movie} />,
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
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MoviesInfoOPhim;
