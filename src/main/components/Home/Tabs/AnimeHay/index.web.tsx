import tw from "@/src/core/tailwind";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, ScrollView, View } from "react-native";
import { useSafeAreaInsetsStyle } from "../../../../hooks/useSafeAreaInsetsStyle";
import MoviesErrorOnlyMobile from "../../../Movies/Error/OnlyMobile";

const HomeTabAnimeHayWeb = () => {
  const [wrapperLayout, setWrapperLayout] = useState({ width: 0, height: 0 });

  const onWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWrapperLayout({ width, height });
  }, []);

  const insets = useSafeAreaInsetsStyle(["bottom"]);

  return (
    <View style={tw`flex-1 px-3`}>
      <View style={tw`grow`} onLayout={onWrapperLayout}>
        <ScrollView
          overScrollMode="never"
          style={tw`h-[${wrapperLayout.height}px]`}
          contentContainerStyle={[tw`grow`, insets]}
          showsVerticalScrollIndicator={false}>
          <MoviesErrorOnlyMobile />
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeTabAnimeHayWeb;
