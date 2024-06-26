import tw from "@/src/core/tailwind";
import { Text } from "@/src/main/base/Native/Text";
import React from "react";
import { View } from "react-native";

const MoviesError = () => {
  return (
    <View style={tw`grow justify-center items-center`}>
      <Text size={12} style={tw`font-semibold text-center`}>
        {`Có lỗi xảy ra quá trình tải phim, vui lòng thử lại sau.`}
      </Text>
    </View>
  );
};

export default MoviesError;
