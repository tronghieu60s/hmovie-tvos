import { isTVPlatform } from "@/src/core/config";
import tw from "@/src/core/tailwind";
import React from "react";
import { View, ViewProps } from "react-native";
import LeftTabBar from "../components/LeftTabBar";

type Props = ViewProps;

const Layout = (props: Props) => {
  const { style, children, ...restProps } = props;

  return (
    <View style={[tw`flex-1 flex-row`, style]} {...restProps}>
      {isTVPlatform && <LeftTabBar />}
      {children}
    </View>
  );
};

export default Layout;
