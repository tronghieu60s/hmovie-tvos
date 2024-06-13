import { calculatePerItemSize } from "@/src/core/commonFuncs";
import tw from "@/src/core/tailwind";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, Pressable, ScrollView, View } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import { Text } from "../../base/Text";
import { Link } from "expo-router";
import { useRecoilValue } from "recoil";
import { moviesOPhimState } from "../../recoil/home/selectors";

const gapSize = 15;

const HomeOPhim = () => {
  const movies = useRecoilValue(moviesOPhimState);

  const [perItemSize, setPerItemSize] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setPerItemSize(calculatePerItemSize(width, gapSize));
  }, []);

  const insets = useSafeAreaInsetsStyle(["bottom"]);

  return (
    <View style={tw`flex-1 px-3`}>
      <View onLayout={onLayout}>
        <ScrollView
          overScrollMode="never"
          contentContainerStyle={insets}
          showsVerticalScrollIndicator={false}
        >
          <View style={tw`flex-row flex-wrap gap-[${gapSize}px] py-3`}>
            {movies.map((movie) => (
              <Link
                key={movie.name}
                href={{
                  params: { slug: movie.slug },
                  pathname: "/movie/ophim/[slug]",
                }}
                asChild
              >
                <Pressable
                  style={tw`w-[${perItemSize - 0.01}px] gap-1`}
                  onPress={() => console.log("test")}
                >
                  <Image
                    style={tw`w-full h-[${perItemSize + 50}px]`}
                    source={movie.thumbUrl}
                    contentFit="cover"
                  />
                  <Text size={13} style={tw`font-semibold`} numberOfLines={1}>
                    {movie.name}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeOPhim;
