import tw from "@/src/core/tailwind";
import { Text } from "@/src/main/base/Native/Text";
import { useTouchable, withTouchable } from "@/src/main/base/Touchable";
import { MovieSource } from "@/src/main/recoil/movie/types";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
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
      href={{ params: { slug }, pathname: `/movie/${source}/[slug]` }}
      asChild>
      <Pressable style={tw`w-[${perItemSize - 0.15}px]`}>
        <View
          style={[
            tw`border-2 rounded-md overflow-hidden`,
            hasFocus ? tw`border-black` : tw`border-transparent`,
          ]}>
          <Image
            style={tw`w-full h-[${perItemSize + 50}px]`}
            source={thumbUrl}
            contentFit="cover"
          />
          <Text
            size={13}
            style={tw`font-semibold px-1 py-0.5`}
            numberOfLines={1}>
            {name}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

const MoviesItemPortrait = withTouchable(DefaultMoviesItemPortrait);

export default MoviesItemPortrait;
