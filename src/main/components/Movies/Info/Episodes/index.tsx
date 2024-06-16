import tw from "@/src/core/tailwind";
import { Text } from "@/src/main/base/Text";
import {
  MovieEpisode,
  MovieEpisodeItem,
  MovieSource,
} from "@/src/main/recoil/movie/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { router } from "expo-router";
import { Play } from "iconsax-react-native";
import React, { useCallback } from "react";
import { Pressable, View } from "react-native";

type Props = {
  source: MovieSource;
  episodes: MovieEpisode[];
};

const MoviesInfoEpisodes = (props: Props) => {
  const { source, episodes } = props;
  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = useCallback(
    (episodes: MovieEpisodeItem) => {
      const options = ["Xem Ngay", "Huỷ"];
      console.log(episodes);

      const linkEmbed = encodeURIComponent(episodes.linkEmbed);
      const watchEmbed = `/${source}/movie/watch/embed/${linkEmbed}`;

      showActionSheetWithOptions(
        { options, cancelButtonIndex: 2 },
        (selected?: number) => {
          switch (selected) {
            case 0:
              router.push(watchEmbed);
              break;

            case 2:
              break;
          }
        },
      );
    },
    [showActionSheetWithOptions, source],
  );

  return (
    <View style={tw`grow min-h-full p-3`}>
      <View style={tw`gap-2`}>
        {episodes.map((item) => (
          <Pressable
            key={item.name}
            style={tw`shadow-md bg-white rounded px-3 py-2`}
            onPress={() => onPress(item.episodes[0])}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`px-3`}>
                <Play size={20} />
              </View>
              <View style={tw`flex-1 grow px-3 py-2`}>
                <Text size={14} style={tw`font-bold`}>
                  Tập {item.name}
                </Text>
                <Text size={12}>{item.filename}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MoviesInfoEpisodes;
