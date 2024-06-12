import tw from "@/src/core/tailwind";
import { useState } from "react";
import { Pressable, TextProps } from "react-native";
import { Text } from "../../Text";

export type TabsItemProps = TextProps & {
  title: string;
  active?: boolean;
};

export const TabsItem = (props: TabsItemProps) => {
  const { title, active, style, ...restProps } = props;

  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      <Text
        size={14}
        style={[
          tw`font-medium rounded-t-lg p-4`,
          tw`${hovered ? "text-gray-600 bg-gray-50" : ""}`,
          tw`${active ? "bg-gray-100 text-blue-600" : "text-gray-500"}`,
          style,
        ]}
        {...restProps}
      >
        {title}
      </Text>
    </Pressable>
  );
};
