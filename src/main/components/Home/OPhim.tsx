import { calculatePerItemSize } from "@/src/core/commonFuncs";
import tw from "@/src/core/tailwind";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, Pressable, ScrollView, View } from "react-native";
import { useRecoilValueLoadable } from "recoil";
import { Text } from "../../base/Text";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import { moviesOPhimState } from "../../recoil/home/selectors";

const gapSize = 15;

const HomeOPhim = () => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const { state, contents: movies } = useRecoilValueLoadable(moviesOPhimState);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  }, []);

  const insets = useSafeAreaInsetsStyle(["bottom"]);

  const perItemSize = useMemo(
    () => calculatePerItemSize(layout.width, gapSize),
    [layout.width],
  );

  return (
    <View style={tw`flex-1 px-3`}>
      <View style={tw`grow`} onLayout={onLayout}>
        <ScrollView
          overScrollMode="never"
          contentContainerStyle={insets}
          style={tw`h-[${layout.height}px]`}
          showsVerticalScrollIndicator={false}
        >
          {state === "hasValue" && (
            <View style={tw`flex-row flex-wrap gap-[${gapSize}px] py-3`}>
              {movies?.map((movie) => (
                <Link
                  key={movie.name}
                  href={{
                    params: { slug: movie.slug },
                    pathname: "/movie/ophim/[slug]",
                  }}
                  asChild
                >
                  <Pressable
                    style={tw`w-[${perItemSize - 0.15}px] gap-1`}
                    onPress={() => console.log("test")}>
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

export default HomeOPhim;
