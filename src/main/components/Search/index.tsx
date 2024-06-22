import tw from "@/src/core/tailwind";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsetsStyle } from "../../hooks/useSafeAreaInsetsStyle";

const SearchScreen = () => {
  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={[tw`grow bg-white`, insets]}>
      <View style={[tw`grow sm:pt-3`]}></View>
    </View>
  );
};

export default SearchScreen;
