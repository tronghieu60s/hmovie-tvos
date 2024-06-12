import tw from "@/src/core/tailwind";
import { useState } from "react";
import { Pressable, Text, TextProps } from "react-native";

type TabsItemProps = TextProps & {
  title: string;
  active?: boolean;
};

export const TabsItem = (props: TabsItemProps) => {
  const { title, active, style, ...restProps } = props;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
    >
      <Text
        style={[
          tw`text-sm font-medium rounded-t-lg p-4`,
          tw`${isHovered ? "text-gray-600 bg-gray-50" : ""}`,
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
