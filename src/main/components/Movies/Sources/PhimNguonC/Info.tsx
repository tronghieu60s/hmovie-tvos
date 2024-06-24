import tw from "@/src/core/tailwind";
import { Tabs } from "@/src/main/base/Flowbite/Tabs";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import { MovieType } from "@/src/main/recoil/movie/phimnguonc/types";
import React from "react";
import { ScrollView, View } from "react-native";
import { s } from "react-native-size-matters";
import MoviesInfoEpisodes from "../../Info/Episodes";
import MoviesInfoImagePoster from "../../Info/ImagePoster";
import MoviesPhimNguonCAbout from "./About";
import MoviesPhimNguonCTopInfo from "./TopInfo";

type Props = {
  movie: MovieType;
  height: number;
};

const MoviesPhimNguonCInfo = (props: Props) => {
  const { movie, height } = props;

  const insets = useSafeAreaInsetsStyle(["bottom"]);

  return (
    <View>
      <MoviesInfoImagePoster posterUrl={movie.posterUrl} />
      <ScrollView
        overScrollMode="never"
        style={tw`h-[${height}px]`}
        contentContainerStyle={[tw`grow`, insets]}
        showsVerticalScrollIndicator={false}>
        <View style={tw`gap-3 mt-[${s(180)}px] sm:mt-[${s(100)}px]`}>
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
                  children: <MoviesInfoEpisodes episodes={movie.episodes} />,
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

export default MoviesPhimNguonCInfo;
