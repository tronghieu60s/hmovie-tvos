import tw from "@/src/core/tailwind";
import React from "react";
import { View, ViewProps } from "react-native";
import { Text } from "../../Native/Text";
import PaginationButton from "./Button";

export type PaginationProps = ViewProps & {
  type?: "default";
  pageSize: number;
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
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
        <Text size={13} style={tw`text-gray-700`}>
          Hiển thị
        </Text>
        <Text size={13} style={tw`font-semibold text-gray-900`}>
          {startItem}
        </Text>
        <Text size={13} style={tw`text-gray-700`}>
          đến
        </Text>
        <Text size={13} style={tw`font-semibold text-gray-900`}>
          {endItem}
        </Text>
        <Text size={13} style={tw`text-gray-700`}>
          của
        </Text>
        <Text size={13} style={tw`font-semibold text-gray-900`}>
          {totalItems}
        </Text>
        <Text size={13} style={tw`text-gray-700`}>
          mục
        </Text>
      </View>
      <View style={tw`flex-row gap-2`}>
        <PaginationButton
          onPress={() =>
            onPageChange && onPageChange(currentPage > 1 ? currentPage - 1 : 1)
          }>
          Trang Trước
        </PaginationButton>
        <PaginationButton
          onPress={() => onPageChange && onPageChange(currentPage + 1)}>
          Trang Tiếp
        </PaginationButton>
      </View>
    </View>
  );
};
