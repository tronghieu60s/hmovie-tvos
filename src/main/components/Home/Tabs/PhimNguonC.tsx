import { calculatePerItemSize } from "@/src/core/commonFuncs";
import tw from "@/src/core/tailwind";
import { Image } from "expo-image";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, Pressable, ScrollView, View } from "react-native";
import { useRecoilValueLoadable } from "recoil";
import { Text } from "../../../base/Text";
import { useSafeAreaInsetsStyle } from "../../../hooks/useSafeAreaInsetsStyle";
import { moviesPhimNguonCState } from "../../../recoil/home/selectors";
import { Pagination } from "../../../base/Flowbite/Pagination";
import Skeleton from "@/src/main/base/Skeleton/Skeleton";
import { scale } from "react-native-size-matters";

const gapSize = 15;

const HomeTabPhimNguonC = () => {
  const { page = 1 } = useLocalSearchParams();

  const { state, contents: movies } = useRecoilValueLoadable(
    moviesPhimNguonCState(Number(page)),
  );
  const [wrapperLayout, setWrapperLayout] = useState({ width: 0, height: 0 });

  const onPageChange = useCallback((page: number) => {
    router.setParams({ page: `${page}` });
  }, []);

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
          {state === "loading" && (
            <View style={tw`py-3 gap-3`}>
              <View style={tw`flex-row flex-wrap gap-[${gapSize}px]`}>
                {[...Array(10)].map((_, index) => (
                  <Skeleton
                    key={index}
                    style={tw`w-[${perItemSize - 0.15}px] h-[${perItemSize + 50 + scale(18)}px]`}
                  />
                ))}
              </View>
            </View>
          )}
          {state === "hasValue" && (
            <View style={tw`py-3 gap-3`}>
              <View style={tw`flex-row flex-wrap gap-[${gapSize}px]`}>
                {movies.items.map((movie) => (
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
                      <Text
                        size={13}
                        style={tw`font-semibold`}
                        numberOfLines={1}>
                        {movie.name}
                      </Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
              <Pagination
                pageSize={movies.pagination.limit}
                currentPage={movies.pagination.page}
                totalItems={movies.pagination.totalItems}
                onPageChange={onPageChange}
              />
            </View>
          )}
          {state === "hasError" && (
            <View style={tw`py-3 gap-3`}>
              <Text size={12}>
                Có lỗi trong quá trình tải phim, vui lòng thử lại sau.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeTabPhimNguonC;
