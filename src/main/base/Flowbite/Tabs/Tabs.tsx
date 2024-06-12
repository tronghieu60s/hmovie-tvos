import tw from "@/src/core/tailwind";
import React, { useState } from "react";
import { View, ViewProps } from "react-native";
import { TabsItem } from "./TabsItem";

export type TabsProps = ViewProps & {
  type?: "default";
  items: { title: string; children: React.ReactNode }[];
};

export const Tabs = (props: TabsProps) => {
  const { items, style, ...restProps } = props;

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View style={[tw`grow`, style]} {...restProps}>
      <View
        style={tw`flex flex-row flex-wrap gap-2 border-b border-gray-200 px-3`}
      >
        {items.map((item, index) => (
          <TabsItem
            key={index}
            title={item.title}
            active={currentTab === index}
            onPress={() => setCurrentTab(index)}
          />
        ))}
      </View>
      <View style={tw`grow`}>{items[currentTab].children}</View>
    </View>
  );
};
