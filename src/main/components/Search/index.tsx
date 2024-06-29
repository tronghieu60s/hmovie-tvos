import { DEBOUNCE_SEARCH_TIMER } from "@/src/core/config/debounce";
import tw from "@/src/core/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import { SearchNormal } from "iconsax-react-native";
import React, { useCallback, useRef, useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { s } from "react-native-size-matters";
import { useDebouncedCallback } from "use-debounce";
import { Text } from "../../base/Native/Text";
import { TextInput } from "../../base/Native/TextInput";
import { Touchable } from "../../base/Touchable";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import SearchSourcesKKPhim from "./Sources/KKPhim";
import SearchSourcesPhimNguonC from "./Sources/PhimNguonC";

const SearchScreen = () => {
  const { keyword = "" } = useLocalSearchParams();

  const textInputRef = useRef<any>(null);

  const [wrapperLayout, setWrapperLayout] = useState({ width: 0, height: 0 });

  const onFocus = useCallback(() => {
    if (!textInputRef.current) {
      return;
    }
    textInputRef.current.focus();
  }, []);

  const onWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWrapperLayout({ width, height });
  }, []);

  const onChangeText = useDebouncedCallback(
    (keyword: string) => router.setParams({ keyword }),
    DEBOUNCE_SEARCH_TIMER,
  );

  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={tw`grow bg-white`}>
      <View style={tw`grow`}>
        <View
          style={[tw`bg-sky-500`, insets.paddingTop > 0 ? insets : tw`pt-3`]}>
          <View style={tw`flex-row items-center gap-4 px-3 pt-0 pb-3`}>
            <SearchNormal
              size={tw.prefixMatch(`sm`) ? s(13) : s(18)}
              color={tw.color("white")}
            />
            <Touchable style={tw`flex-1`} onFocus={onFocus} hasTVPreferredFocus>
              <TextInput
                ref={textInputRef}
                style={tw`grow bg-white rounded px-3 py-1`}
                placeholder="Tìm kiếm"
                onChangeText={onChangeText}
                defaultValue={`${keyword}`}
              />
            </Touchable>
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
                <Text size={14} style={tw`font-semibold text-center`}>
                  {`Vui lòng nhập 3 ký tự trở lên để tìm kiếm phim.`}
                </Text>
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
