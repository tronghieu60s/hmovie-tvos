import { layout } from "@/src/core/layout";
import tw from "@/src/core/tailwind";
import { Tabs } from "@/src/main/base/Flowbite/Tabs";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { movieInfoPhimNguonCState } from "@/src/main/recoil/movie/phimnguonc/selectors";
import { MovieType } from "@/src/main/recoil/movie/phimnguonc/types";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, ScrollView, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import { useRecoilValueLoadable } from "recoil";
import MoviesInfoEpisodes from "../../Info/Episodes";
import MoviesInfoPoster from "../../Info/Poster";
import MoviesInfoPosterSkeleton from "../../Info/Poster/Skeleton";
import MoviesInfoSkeleton from "../../Info/Skeleton";
import MoviesInfoTopInfoSkeleton from "../../Info/TopInfo/Skeleton";
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

  return (
    <View style={tw`flex-1`}>
      <View style={tw`grow`} onLayout={onWrapperLayout}>
        {state === "loading" && (
          <View>
            <MoviesInfoPosterSkeleton />
            <ScrollView
              overScrollMode="never"
              style={tw`h-[${wrapperLayout.height}px]`}
              contentContainerStyle={[tw`grow`, insets]}
              showsVerticalScrollIndicator={false}>
              <View
                style={tw`gap-3 mt-[${(layout.window.height / 6) * 2 - 100}px]`}>
                <MoviesInfoTopInfoSkeleton />
                <MoviesInfoSkeleton />
              </View>
            </ScrollView>
          </View>
        )}
        {state === "hasValue" && (
          <View>
            <MoviesInfoPoster posterUrl={movie.posterUrl} />
            <ScrollView
              overScrollMode="never"
              style={tw`h-[${wrapperLayout.height}px]`}
              contentContainerStyle={[tw`grow`, insets]}
              showsVerticalScrollIndicator={false}>
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
            </ScrollView>
          </View>
        )}
        {state === "hasError" && (
          <View style={tw`grow justify-center items-center`}>
            <Text>Có lỗi xảy ra quá trình tải phim, vui lòng thử lại sau.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MoviesInfoPhimNguonC;
