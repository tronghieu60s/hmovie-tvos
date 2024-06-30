import tw from "@/src/core/tailwind";
import { Text } from "@/src/main/base/Native/Text";
import { useTouchable, withTouchable } from "@/src/main/base/Touchable";
import React from "react";
import { View } from "react-native";

type Props = {
  name: string;
  filename?: string;
  perItemSize: number;
};

const DefaultMoviesInfoEpisodesItem = (props: Props) => {
  const { name, filename, perItemSize } = props;

  const { hasFocus } = useTouchable();

  return (
    <View
      style={[
        tw`w-[${perItemSize - 0.15}px] shadow-sm bg-white rounded px-3 py-2`,
        hasFocus && tw`bg-gray-800`,
      ]}>
      <View style={tw`flex-row items-center`}>
        <View style={tw`flex-1 px-3 py-2`}>
          <Text
            size={14}
            style={[tw`font-bold capitalize`, hasFocus && tw`text-white`]}>
            {!name.toLowerCase().includes("tập") && "Tập "}
            {name}
          </Text>
          {filename && <Text size={12}>{filename}</Text>}
        </View>
      </View>
    </View>
  );
};

const MoviesInfoEpisodesItem = withTouchable(DefaultMoviesInfoEpisodesItem);

export default MoviesInfoEpisodesItem;
