import { DEBOUNCE_SEARCH_TIMER } from "@/src/core/config/debounce";
import tw from "@/src/core/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import { SearchNormal } from "iconsax-react-native";
import React, { useCallback, useState } from "react";
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  ScrollView,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { s } from "react-native-size-matters";
import { useDebouncedCallback } from "use-debounce";
import { Text } from "../../base/Native/Text";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import SearchSourcesKKPhim from "./Sources/KKPhim";
import SearchSourcesPhimNguonC from "./Sources/PhimNguonC";

const SearchScreen = () => {
  const { keyword = "" } = useLocalSearchParams();

  const [wrapperLayout, setWrapperLayout] = useState({ width: 0, height: 0 });

  const onWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWrapperLayout({ width, height });
  }, []);

  const onChangeKeyword = useDebouncedCallback(
    (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const keyword = event.nativeEvent.text;
      router.setParams({ keyword });
    },
    DEBOUNCE_SEARCH_TIMER,
  );

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={tw`grow bg-white`}>
      <View style={tw`grow`}>
        <View
          style={[tw`bg-sky-500`, insets.paddingTop > 0 ? insets : tw`pt-3`]}>
          <View style={tw`flex-row items-center gap-4 px-3 pt-0 pb-3`}>
            <SearchNormal size={s(18)} color={tw.color("white")} />
            <TextInput
              style={tw`grow text-[${s(15)}px] bg-white rounded px-3 py-1`}
              placeholder="Tìm kiếm"
              onChange={onChangeKeyword}
              defaultValue={String(keyword)}
            />
          </View>
        </View>
        <View style={tw`flex-1 px-3 py-3`}>
          <View style={tw`grow`} onLayout={onWrapperLayout}>
            <ScrollView
              overScrollMode="never"
              style={tw`h-[${wrapperLayout.height}px]`}
              contentContainerStyle={[tw`grow`, insets]}
              showsVerticalScrollIndicator={false}>
              {keyword.length < 3 && (
                <View style={tw`grow items-center`}>
                  <Text size={13} style={tw`font-semibold text-center`}>
                    {`Vui lòng nhập 3 ký tự trở lên để tìm kiếm phim.`}
                  </Text>
                </View>
              )}
              {keyword.length >= 3 && (
                <View>
                  <SearchSourcesKKPhim width={wrapperLayout.width} />
                  <SearchSourcesPhimNguonC width={wrapperLayout.width} />
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;
