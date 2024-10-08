import tw from "@/src/core/tailwind";
import { Tabs } from "@/src/main/base/Flowbite/Tabs";
import { Text } from "@/src/main/base/Native/Text";
import Back from "@/src/main/base/NativeTv/Back";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { MoviesItem } from "@/src/main/recoil/movie/types";
import { router } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { s } from "react-native-size-matters";
import MovieInfoAbout from "../About";
import MoviesInfoEpisodes from "../Episodes";
import MoviesInfoImagePoster from "../ImagePoster";
import MoviesInfoTopInfo from "../TopInfo";

type Props = {
  height: number;
  movie: MoviesItem;
};

const MoviesInfoItem = (props: Props) => {
  const { height, movie } = props;

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View>
      <MoviesInfoImagePoster
        style={tw`sm:hidden`}
        posterUrl={movie.posterUrl}
      />
      <ScrollView
        overScrollMode="never"
        style={tw`h-[${height}px]`}
        contentContainerStyle={[tw`grow`, insets.paddingTop === 0 && tw`pt-3`]}
        showsVerticalScrollIndicator={false}>
        <View style={tw`gap-3 mt-[${s(180)}px] sm:mt-0`}>
          <View style={tw`flex-row items-center gap-2 px-2 hidden sm:flex`}>
            <Back onPress={() => router.back()} hasTVPreferredFocus />
            <Text size={16} style={tw`font-bold`} numberOfLines={1}>
              {movie.name}
            </Text>
          </View>
          <MoviesInfoTopInfo movie={movie} />
          <View style={tw`flex-1 bg-white hidden sm:flex`}>
            <MovieInfoAbout movie={movie} />
            <View style={tw`gap-3 p-3`}>
              <Text size={15} style={tw`font-bold`}>
                Xem Phim
              </Text>
              <MoviesInfoEpisodes
                source={movie.source}
                episodes={movie.episodes}
              />
            </View>
          </View>
          <View style={tw`flex-1 bg-white sm:hidden`}>
            <Tabs
              items={[
                {
                  title: "Thông tin",
                  children: <MovieInfoAbout movie={movie} />,
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
              itemStyles={{ size: 13.5 }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MoviesInfoItem;
