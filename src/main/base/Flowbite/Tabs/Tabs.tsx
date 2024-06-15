import tw from "@/src/core/tailwind";
import React, { useState } from "react";
import { StyleProp, TextStyle, View, ViewProps } from "react-native";
import { TabsItem } from "./TabsItem";

export type TabsProps = ViewProps & {
  type?: "default";
  items: { title: string; children: React.ReactNode }[];
  titleStyle?: StyleProp<TextStyle>;
};

export const Tabs = (props: TabsProps) => {
  const { items, style, titleStyle, ...restProps } = props;

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View style={[tw`grow`, style]} {...restProps}>
      <View
        style={tw`flex flex-row flex-wrap gap-2 border-b border-gray-200 px-3`}>
        {items.map((item, index) => (
          <TabsItem
            key={index}
            title={item.title}
            titleStyle={titleStyle}
            active={currentTab === index}
            onPress={() => setCurrentTab(index)}
          />
        ))}
      </View>
      <View style={tw`grow`}>{items[currentTab].children}</View>
    </View>
  );
};
