import tw from "@/src/core/tailwind";
import { Text } from "@/src/main/base/Native/Text";
import React from "react";
import { View } from "react-native";

const MoviesErrorOnlyMobile = () => {
  return (
    <View style={tw`grow justify-center items-center`}>
      <Text size={13} style={tw`font-semibold text-center`}>
        {`Nguồn này chỉ hỗ trợ trên các thiết bị di động\nVui lòng tải ứng dụng để trải nghiệm.`}
      </Text>
    </View>
  );
};

export default MoviesErrorOnlyMobile;
