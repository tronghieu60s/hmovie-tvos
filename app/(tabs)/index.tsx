import tw from "@/src/core/tailwind";
import Home from "@/src/main/components/Home";
import { useSafeAreaInsetsStyle } from "@/src/main/hooks/useSafeAreaInsetsStyle";
import React from "react";
import { View } from "react-native";

const IndexTab = () => {
  const insets = useSafeAreaInsetsStyle(["top"]);

  return (
    <View style={[tw`grow bg-white`, insets]}>
      <Home />
    </View>
  );
};

export default IndexTab;
