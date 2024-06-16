import { calculatePerItemSize } from "@/src/core/commonFuncs";
import tw from "@/src/core/tailwind";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, Pressable, ScrollView, View } from "react-native";
import { useRecoilValueLoadable } from "recoil";
import { Text } from "../../base/Text";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import { moviesPhimNguonCState } from "../../recoil/home/selectors";

const gapSize = 15;

const HomePhimNguonC = () => {
  const { state, contents: movies } = useRecoilValueLoadable(
    moviesPhimNguonCState,
  );
  const [wrapperLayout, setWrapperLayout] = useState({ width: 0, height: 0 });

  const onWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWrapperLayout({ width, height });
  }, []);

  const insets = useSafeAreaInsetsStyle(["bottom"]);

  const perItemSize = useMemo(
    () => calculatePerItemSize(wrapperLayout.width, gapSize),
    [wrapperLayout.width],
  );

  return (
    <View style={tw`flex-1 px-3`}>
      <View style={tw`grow`} onLayout={onWrapperLayout}>
        <ScrollView
          overScrollMode="never"
          style={tw`h-[${wrapperLayout.height}px]`}
          contentContainerStyle={[tw`grow`, insets]}
          showsVerticalScrollIndicator={false}>
          {state === "hasValue" && (
            <View style={tw`flex-row flex-wrap gap-[${gapSize}px] py-3`}>
              {movies.map((movie) => (
                <Link
                  key={movie.name}
                  href={{
                    params: { slug: movie.slug },
                    pathname: `/${movie.source}/movie/[slug]`,
                  }}
                  asChild>
                  <Pressable style={tw`w-[${perItemSize - 0.15}px] gap-1`}>
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
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomePhimNguonC;
