import { layout } from "@/src/core/layout";
import tw from "@/src/core/tailwind";
import { Badge } from "@/src/main/base/Flowbite/Badge";
import { Text } from "@/src/main/base/Text";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { movieInfoOPhimState } from "@/src/main/recoil/movie/ophim/selectors";
import { MovieType } from "@/src/main/recoil/movie/ophim/types";
import { Image, ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { useRecoilValueLoadable } from "recoil";

const MoviesOPhimInfo = () => {
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
        <ImageBackground
          style={tw`absolute w-full h-[${(layout.window.height / 6) * 2}px] top-0 left-0`}
          source={{ uri: movie.posterUrl }}
          contentFit="cover"></ImageBackground>
        <ScrollView
          overScrollMode="never"
          style={tw`h-[${wrapperLayout.height}px]`}
          contentContainerStyle={[tw`grow`, insets]}
          showsVerticalScrollIndicator={false}>
          {state === "hasValue" && (
            <View style={tw`grow`}>
              <View
                style={tw`grow gap-3 mt-[${(layout.window.height / 6) * 2 - 100}px]`}>
                <View style={tw`grow flex-row gap-3 px-3`}>
                  <View style={tw`flex-row`}>
                    <Badge
                      label={`${movie.currentEpisode} / ${movie.totalEpisodes}`}
                      style={tw`absolute bottom-0 z-10 m-2`}
                    />
                    <Image
                      style={tw`w-[${scale(100)}px] h-[${scale(150)}px] rounded-lg`}
                      source={{ uri: movie.thumbUrl }}
                      contentFit="cover"
                    />
                  </View>
                  <View style={tw`grow gap-2 mt-[${verticalScale(40)}px]`}>
                    <View
                      style={tw`grow justify-center gap-3 bg-white shadow p-3 pt-2 rounded-lg`}>
                      <View style={tw`gap-1`}>
                        <Text size={16} style={tw`font-bold`}>
                          {movie.name}
                        </Text>
                        <Text size={12}>{movie.originName}</Text>
                      </View>
                      <View style={tw`gap-2`}>
                        <View
                          style={tw`flex-row flex-wrap gap-x-2 gap-y-1 ml-0.5`}>
                          {movie.language && (
                            <Text style={tw`font-semibold`}>
                              {movie.language}
                            </Text>
                          )}
                          {movie.quality && (
                            <View style={tw`flex-row gap-2`}>
                              <Text>•</Text>
                              <Text style={tw`font-semibold`}>
                                {movie.quality}
                              </Text>
                            </View>
                          )}
                          {movie.duration && (
                            <View style={tw`flex-row gap-2`}>
                              <Text>•</Text>
                              <Text style={tw`font-semibold`}>
                                {movie.duration}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={tw`flex-row flex-wrap gap-2`}>
                          {movie.categories.map((category, index) => (
                            <Badge key={index} label={category} />
                          ))}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={tw`grow bg-white gap-5 p-3`}>
                  <View style={tw`gap-3`}>
                    <Text size={15} style={tw`font-bold`}>
                      Nội Dung
                    </Text>
                    <Text>{movie.content.replace(/<[^>]*>?/gm, "")}</Text>
                  </View>
                  {movie.countries.length > 0 && (
                    <View style={tw`gap-3`}>
                      <Text size={15} style={tw`font-bold`}>
                        Quốc Gia
                      </Text>
                      <View style={tw`flex-row flex-wrap gap-2`}>
                        {movie.countries.map((director, index) => (
                          <Badge key={index} label={director} />
                        ))}
                      </View>
                    </View>
                  )}
                  {movie.directors.length > 0 && (
                    <View style={tw`gap-3`}>
                      <Text size={15} style={tw`font-bold`}>
                        Đạo Diễn
                      </Text>
                      <View style={tw`flex-row flex-wrap gap-2`}>
                        {movie.directors.map((director, index) => (
                          <Badge key={index} label={director} />
                        ))}
                      </View>
                    </View>
                  )}
                  {movie.casts.length > 0 && (
                    <View style={tw`gap-3`}>
                      <Text size={15} style={tw`font-bold`}>
                        Diễn Viên
                      </Text>
                      <View style={tw`flex-row flex-wrap gap-2`}>
                        {movie.casts.map((cast, index) => (
                          <Badge key={index} label={cast} />
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default MoviesOPhimInfo;
