import { isWebPlatform } from "@/src/core/config";
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
import { Linking, Pressable, View } from "react-native";

type Props = {
  source: MovieSource;
  episodes: MovieEpisode[];
};

const MoviesInfoEpisodes = (props: Props) => {
  const { source, episodes } = props;
  const { showActionSheetWithOptions } = useActionSheet();

  const onPressWatch = useCallback(
    (episodes: MovieEpisodeItem) => {
      let watchEmbed = "";
      if (episodes.linkEmbed) {
        const linkEmbed = encodeURIComponent(episodes.linkEmbed);
        watchEmbed = `/${source}/watch/embed/${linkEmbed}`;
      }

      if (isWebPlatform) {
        if (watchEmbed) {
          router.push(watchEmbed);
        }
        return;
      }

      const sheetOptions = ["Xem ngay", "Xem qua ứng dụng khác", "Huỷ"];
      showActionSheetWithOptions(
        { options: sheetOptions, cancelButtonIndex: sheetOptions.length - 1 },
        (selected?: number) => {
          if (selected === 0) {
            if (watchEmbed) {
              router.push(watchEmbed);
            }
          }

          if (selected === 1) {
            if (episodes.linkM3u8) {
              Linking.openURL(episodes.linkM3u8);
            }
          }
        },
      );
    },
    [showActionSheetWithOptions, source],
  );

  const onPressEpisode = useCallback(
    (episodes: MovieEpisodeItem[]) => {
      const sheetServers = episodes.map((item) => item.server);
      const sheetOptions = [...sheetServers, "Huỷ"];

      showActionSheetWithOptions(
        { options: sheetOptions, cancelButtonIndex: sheetOptions.length - 1 },
        (selected?: number) => {
          episodes.forEach((item) => {
            if (selected === sheetServers.indexOf(item.server)) {
              onPressWatch(item);
            }
          });
        },
      );
    },
    [onPressWatch, showActionSheetWithOptions],
  );

  return (
    <View style={tw`grow min-h-full p-3`}>
      <View style={tw`gap-2`}>
        {episodes.map((item) => (
          <Pressable
            key={item.name}
            style={tw`shadow-md bg-white rounded px-3 py-2`}
            onPress={() => onPressEpisode(item.episodes)}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`px-3`}>
                <Play size={20} color="#000000" />
              </View>
              <View style={tw`flex-1 px-3 py-2`}>
                <Text size={14} style={tw`font-bold capitalize`}>
                  Tập {item.name}
                </Text>
                {item.filename && <Text size={12}>{item.filename}</Text>}
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MoviesInfoEpisodes;
