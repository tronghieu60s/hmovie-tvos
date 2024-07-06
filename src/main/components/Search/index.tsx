import { DEBOUNCE_SEARCH_TIMER } from "@/src/core/config/debounce";
import { layout } from "@/src/core/layout";
import tw from "@/src/core/tailwind";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { vs } from "react-native-size-matters";
import { useDebouncedCallback } from "use-debounce";
import IconSax from "../../base/IconSax";
import { Text } from "../../base/Native/Text";
import { TextInput } from "../../base/Native/TextInput";
import { Touchable } from "../../base/Touchable";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";
import SearchItem from "./Item";

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
          style={[
            tw`bg-sky-500`,
            tw`pl-[${layout.widthLeftTabBar}px]`,
            insets.paddingTop > 0 ? insets : tw`pt-3`,
          ]}>
          <View style={tw`flex-row items-center gap-4 px-3 pt-0 pb-3`}>
            <IconSax name="SearchNormal" size={20} color={tw.color("white")} />
            <Touchable style={tw`flex-1`} onFocus={onFocus} hasTVPreferredFocus>
              <TextInput
                ref={textInputRef}
                style={tw`grow bg-white text-black rounded px-3 py-[${vs(8)}px] sm:py-1`}
                placeholder="Tìm kiếm"
                placeholderTextColor={tw.color("gray-400")}
                onChangeText={onChangeText}
                defaultValue={`${keyword}`}
              />
            </Touchable>
          </View>
        </View>
        <View style={tw`flex-1 pl-[${layout.widthLeftTabBar}px]`}>
          <View style={tw`flex-1 px-3`}>
            <View style={tw`grow`} onLayout={onWrapperLayout}>
              <ScrollView
                overScrollMode="never"
                style={tw`h-[${wrapperLayout.height}px]`}
                contentContainerStyle={tw`py-3`}
                showsVerticalScrollIndicator={false}>
                {keyword.length < 3 && (
                  <Text size={14} style={tw`font-semibold text-center`}>
                    {`Vui lòng nhập 3 ký tự trở lên để tìm kiếm phim.`}
                  </Text>
                )}
                {keyword.length >= 3 && (
                  <View style={tw`gap-5`}>
                    <View>
                      <Text size={16} style={tw`text-black font-bold`}>
                        AnimeHay
                      </Text>
                      <SearchItem
                        width={wrapperLayout.width}
                        source="animehay"
                      />
                    </View>
                    <View>
                      <Text size={16} style={tw`text-black font-bold`}>
                        Ổ Phim
                      </Text>
                      <SearchItem width={wrapperLayout.width} source="ophim" />
                    </View>
                    <View>
                      <Text size={16} style={tw`text-black font-bold`}>
                        KK Phim
                      </Text>
                      <SearchItem width={wrapperLayout.width} source="kkphim" />
                    </View>
                    <View>
                      <Text size={16} style={tw`text-black font-bold`}>
                        Phim Nguồn C
                      </Text>
                      <SearchItem
                        width={wrapperLayout.width}
                        source="phimnguonc"
                      />
                    </View>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;
