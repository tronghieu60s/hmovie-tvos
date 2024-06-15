import tw from "@/src/core/tailwind";
import { useState } from "react";
import { Pressable, StyleProp, TextProps, TextStyle } from "react-native";
import { Text } from "../../Text";

export type TabsItemProps = TextProps & {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  active?: boolean;
};

export const TabsItem = (props: TabsItemProps) => {
  const { title, titleStyle, active, ...restProps } = props;

  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      {...restProps}>
      <Text
        size={14}
        style={[
          tw`font-medium rounded-t-lg p-4`,
          tw`${hovered ? "text-gray-600 bg-gray-50" : ""}`,
          tw`${active ? "bg-gray-100 text-blue-600" : "text-gray-500"}`,
          titleStyle,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};
