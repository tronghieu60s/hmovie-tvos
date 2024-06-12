import tw from "@/src/core/tailwind";
import React, { useState } from "react";
import { View, ViewProps } from "react-native";
import { TabsItem } from "./TabsItem";

type TabsProps = ViewProps & {
  type?: "default";
  items: { title: string; children: React.ReactNode }[];
};

export const Tabs = (props: TabsProps) => {
  const { style, items, ...restProps } = props;

  const [currentTab, setCurrentTab] = useState(0);

  return (
    <View {...restProps}>
      <View style={tw`flex flex-row flex-wrap gap-2 border-b border-gray-200`}>
        {items.map((item, index) => (
          <TabsItem
            key={index}
            title={item.title}
            active={currentTab === index}
            onPress={() => setCurrentTab(index)}
          />
        ))}
      </View>
      <View style={[tw`mt-2`, style]}>{items[currentTab].children}</View>
    </View>
  );
};
