import tw from "@/src/core/tailwind";
import React, { useCallback, useState } from "react";
import { StyleProp, TextStyle, View, ViewProps } from "react-native";
import { TabsItem } from "./TabsItem";

export type TabsProps = ViewProps & {
  type?: "default";
  items: { title: string; children: React.ReactNode }[];
  titleStyle?: StyleProp<TextStyle>;
  currentTab?: number;
  onChangeTab?: (index: number) => void;
};

export const Tabs = (props: TabsProps) => {
  const {
    items,
    style,
    titleStyle,
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
            titleStyle={titleStyle}
            active={current === index}
            onPress={() => onChangeTabProxy(index)}
          />
        ))}
      </View>
      <View style={tw`grow`}>{items[current].children}</View>
    </View>
  );
};
