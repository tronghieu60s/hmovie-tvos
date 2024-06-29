import tw from "@/src/core/tailwind";
import { Text } from "@/src/main/base/Native/Text";
import { useTouchable, withTouchable } from "@/src/main/base/Touchable";
import { MovieSource } from "@/src/main/recoil/movie/types";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

type Props = {
  name: string;
  slug: string;
  source: MovieSource;
  thumbUrl: string;
  perItemSize?: number;
};

const DefaultMoviesItemPortrait = (props: Props) => {
  const { name, slug, source, thumbUrl, perItemSize = scale(100) } = props;

  const { hasFocus } = useTouchable();

  return (
    <Link
      href={{ params: { slug }, pathname: `/sources/${source}/movie/[slug]` }}
      asChild>
      <View style={tw`w-[${perItemSize - 0.15}px]`}>
        <View
          style={[
            tw`border-2 rounded overflow-hidden`,
            hasFocus ? tw`border-black` : tw`border-transparent`,
          ]}>
          <View style={tw`w-full h-[${perItemSize + 50}px] bg-gray-300`}>
            <Image
              style={tw`w-full h-full`}
              source={thumbUrl}
              contentFit="cover"
            />
          </View>
          <Text
            size={13}
            style={tw`font-semibold px-1 py-0.5`}
            numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>
    </Link>
  );
};

const MoviesItemPortrait = withTouchable(DefaultMoviesItemPortrait);

export default MoviesItemPortrait;
