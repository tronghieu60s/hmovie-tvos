import tw from "@/src/core/tailwind";
import { Badge } from "@/src/main/base/Flowbite/Badge";
import { Text } from "@/src/main/base/Native/Text";
import { MovieType } from "@/src/main/recoil/movie/ophim/types";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  movie: MovieType;
};

const MoviesOPhimTopInfo = (props: Props) => {
  const { movie } = props;

  return (
    <View style={tw`flex-row items-end sm:items-start gap-2.5 px-2.5`}>
      <View style={tw`relative flex-row bg-gray-300 rounded overflow-hidden`}>
        <Badge
          label={movie.currentEpisode}
          style={tw`absolute bottom-0 z-10 m-2`}
        />
        <Image
          style={[
            tw`w-[${scale(100)}px] h-[${scale(140)}px]`,
            tw`sm:w-[${scale(80)}px] sm:h-[${scale(110)}px]`,
          ]}
          source={{ uri: movie.thumbUrl }}
          contentFit="cover"
        />
      </View>
      <View style={tw`flex-1`}>
        <View
          style={tw`justify-center gap-3 bg-white shadow sm:shadow-none p-3 sm:p-2 pt-2 sm:pt-0 rounded-lg`}>
          <View style={tw`gap-1.5 hidden sm:flex`}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={tw`flex-row flex-wrap gap-x-2 gap-y-1 ml-0.5`}>
                {movie.language && (
                  <Text size={13} style={tw`font-semibold`}>
                    {movie.language}
                  </Text>
                )}
                {movie.quality && (
                  <View style={tw`flex-row gap-2`}>
                    <Text>•</Text>
                    <Text size={13} style={tw`font-semibold`}>
                      {movie.quality}
                    </Text>
                  </View>
                )}
                {movie.duration && (
                  <View style={tw`flex-row gap-2`}>
                    <Text>•</Text>
                    <Text size={13} style={tw`font-semibold`}>
                      {movie.duration}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={tw`flex-row flex-wrap gap-2`}>
                {movie.categories.map((category, index) => (
                  <Badge key={index} label={category} />
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={tw`gap-1`}>
            <Text size={16} style={tw`font-bold`} numberOfLines={1}>
              {movie.name}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text size={13}>{movie.originName}</Text>
            </ScrollView>
          </View>
          <View style={tw`gap-1.5 sm:hidden`}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={tw`flex-row flex-wrap gap-x-2 gap-y-1 ml-0.5`}>
                {movie.language && (
                  <Text size={13} style={tw`font-semibold`}>
                    {movie.language}
                  </Text>
                )}
                {movie.quality && (
                  <View style={tw`flex-row gap-2`}>
                    <Text>•</Text>
                    <Text size={13} style={tw`font-semibold`}>
                      {movie.quality}
                    </Text>
                  </View>
                )}
                {movie.duration && (
                  <View style={tw`flex-row gap-2`}>
                    <Text>•</Text>
                    <Text size={13} style={tw`font-semibold`}>
                      {movie.duration}
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={tw`flex-row flex-wrap gap-2`}>
                {movie.categories.map((category, index) => (
                  <Badge key={index} label={category} />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MoviesOPhimTopInfo;
