import tw from "@/src/core/tailwind";
import React from "react";
import { Pressable, View, ViewProps } from "react-native";
import { Text } from "../../Text";

export type PaginationProps = ViewProps & {
  type?: "default";
  pageSize: number;
  currentPage: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
};

export const Pagination = (props: PaginationProps) => {
  const {
    style,
    pageSize,
    currentPage,
    totalItems,
    onPageChange,
    ...restProps
  } = props;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <View style={[tw`flex flex-col items-center gap-2`, style]} {...restProps}>
      <View style={tw`flex-row gap-1`}>
        <Text size={12} style={tw`text-gray-700`}>
          Hiển thị
        </Text>
        <Text size={12} style={tw`font-semibold text-gray-900`}>
          {startItem}
        </Text>
        <Text size={12} style={tw`text-gray-700`}>
          đến
        </Text>
        <Text size={12} style={tw`font-semibold text-gray-900`}>
          {endItem}
        </Text>
        <Text size={12} style={tw`text-gray-700`}>
          của
        </Text>
        <Text size={12} style={tw`font-semibold text-gray-900`}>
          {totalItems}
        </Text>
        <Text size={12} style={tw`text-gray-700`}>
          mục
        </Text>
      </View>
      <View style={tw`flex-row gap-2`}>
        <Pressable
          style={tw`h-8 flex items-center justify-center px-3 bg-gray-800 rounded`}
          onPress={() =>
            onPageChange && onPageChange(currentPage > 1 ? currentPage - 1 : 1)
          }>
          <Text size={12} style={tw`font-medium text-white`}>
            Trang trước
          </Text>
        </Pressable>
        <Pressable
          style={tw`h-8 flex items-center justify-center px-3 bg-gray-800 rounded`}
          onPress={() => onPageChange && onPageChange(currentPage + 1)}>
          <Text size={12} style={tw`font-medium text-white`}>
            Trang tiếp
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
