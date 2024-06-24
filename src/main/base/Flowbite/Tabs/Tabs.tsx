import tw from "@/src/core/tailwind";
import React, { useCallback, useState } from "react";
import { ScrollView, View, ViewProps } from "react-native";
import { TabsItem, TabsItemStyles } from "./TabsItem";

export type TabsProps = ViewProps & {
  type?: "default";
  items: { title: string; children: React.ReactNode }[];
  itemStyles?: TabsItemStyles;
  currentTab?: number;
  onChangeTab?: (index: number) => void;
};

export const Tabs = (props: TabsProps) => {
  const {
    items,
    style,
    itemStyles,
    currentTab = 0,
    onChangeTab,
    ...restProps
  } = props;

  const [current, setCurrent] = useState(currentTab);

  const onChangeTabProxy = useCallback(
    (index: number) => {
      setCurrent(index);
      onChangeTab && onChangeTab(index);
    },
    [onChangeTab],
  );

  return (
    <View style={[tw`grow`, style]} {...restProps}>
      <ScrollView
        horizontal
        overScrollMode="never"
        style={tw`border-b border-gray-200`}
        contentContainerStyle={tw`flex-row flex-wrap gap-2 px-3`}
        showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <TabsItem
            key={index}
            title={item.title}
            active={current === index}
            onPress={() => onChangeTabProxy(index)}
            {...itemStyles}
          />
        ))}
      </ScrollView>
      <View style={tw`grow`}>{items[current].children}</View>
    </View>
  );
};
