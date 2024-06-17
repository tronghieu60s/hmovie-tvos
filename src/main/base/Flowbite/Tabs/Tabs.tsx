import tw from "@/src/core/tailwind";
import React, { useCallback, useState } from "react";
import { View, ViewProps } from "react-native";
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
      <View
        style={tw`flex flex-row flex-wrap gap-2 border-b border-gray-200 px-3`}>
        {items.map((item, index) => (
          <TabsItem
            key={index}
            title={item.title}
            active={current === index}
            onPress={() => onChangeTabProxy(index)}
            {...itemStyles}
          />
        ))}
      </View>
      <View style={tw`grow`}>{items[current].children}</View>
    </View>
  );
};
