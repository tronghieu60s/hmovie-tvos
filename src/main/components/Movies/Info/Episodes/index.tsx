import { axiosRequest } from "@/src/core/api";
import { calculateListItemStyle } from "@/src/core/commonFuncs";
import tw from "@/src/core/tailwind";
import IconSax from "@/src/main/base/IconSax";
import { Text } from "@/src/main/base/Native/Text";
import { Touchable } from "@/src/main/base/Touchable";
import {
  MovieEpisode,
  MovieEpisodeItem,
  MovieSource,
} from "@/src/main/recoil/movie/types";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, LayoutChangeEvent, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import MoviesInfoEpisodesItem from "./Item";

type Props = {
  source: MovieSource;
  episodes: MovieEpisode[];
};

const MoviesInfoEpisodes = (props: Props) => {
  const { source, episodes } = props;

  const toast = useToast();
  const { showActionSheetWithOptions } = useActionSheet();

  const [loading, setLoading] = useState("");
  const [wrapperLayout, setWrapperLayout] = useState({ width: 0, height: 0 });

  const onWrapperLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWrapperLayout({ width, height });
  }, []);

  const onGetEpisodes = useCallback(
    async (slug: string) => {
      if (loading) {
        toast.show("Đang xử lý, vui lòng thử lại sau.");
        return;
      }

      setLoading(slug);

      const apiUrl = `/sources/${source}/watch/${slug}`;
      const watchItem = await axiosRequest.get(apiUrl);

      setLoading("");
      return watchItem.data.data.episodes;
    },
    [loading, source, toast],
  );

  const onWatchM3u8 = useCallback((linkM3u8?: string) => {
    if (!linkM3u8) {
      return;
    }

    router.push(`/watch/embed/${encodeURIComponent(linkM3u8)}`);
  }, []);

  const onWatchEmbed = useCallback((linkEmbed?: string, isProxy = false) => {
    if (!linkEmbed) {
      return;
    }

    const urlEmbed = encodeURIComponent(linkEmbed);

    if (isProxy) {
      router.push(`/watch/embed/proxy/${urlEmbed}`);
      return;
    }

    router.push(`/watch/embed/${urlEmbed}`);
  }, []);

  const onPressWatch = useCallback(
    (episodes: MovieEpisodeItem) => {
      const sheetOptions = ["Xem ngay", "Xem qua ứng dụng khác", "Huỷ"];

      showActionSheetWithOptions(
        { options: sheetOptions, cancelButtonIndex: sheetOptions.length - 1 },
        (selected?: number) => {
          if (selected === 0) {
            onWatchEmbed(episodes.linkEmbed, episodes.isProxy);
          }
          if (selected === 1) {
            onWatchM3u8(episodes.linkM3u8);
          }
        },
      );
    },
    [onWatchEmbed, onWatchM3u8, showActionSheetWithOptions],
  );

  const onPressEpisode = useCallback(
    async (item: MovieEpisode) => {
      let { episodes } = item;

      if (!episodes) {
        episodes = await onGetEpisodes(item.slug);
      }

      if (!episodes) {
        return;
      }

      const sheetServers = episodes.map((item) => `Server: ${item.server}`);
      const sheetOptions = [...sheetServers, "Huỷ"];

      showActionSheetWithOptions(
        { options: sheetOptions, cancelButtonIndex: sheetOptions.length - 1 },
        (selected?: number) => {
          episodes.forEach((item) => {
            if (selected === sheetServers.indexOf(`Server: ${item.server}`)) {
              if (item.linkM3u8 && item.linkEmbed) {
                onPressWatch(item);
              } else if (item.linkM3u8) {
                onWatchM3u8(item.linkM3u8);
              } else if (item.linkEmbed) {
                onWatchEmbed(item.linkEmbed, item.isProxy);
              }
            }
          });
        },
      );
    },
    [
      onGetEpisodes,
      onPressWatch,
      onWatchEmbed,
      onWatchM3u8,
      showActionSheetWithOptions,
    ],
  );

  const listItemStyle = useMemo(
    () => calculateListItemStyle(wrapperLayout.width, 10),
    [wrapperLayout.width],
  );

  return (
    <View>
      <View style={tw`hidden sm:flex`} onLayout={onWrapperLayout}>
        <View style={tw`flex-row flex-wrap gap-[${listItemStyle.gapSize}px]`}>
          {episodes.map((item, index) => (
            <MoviesInfoEpisodesItem
              key={index}
              name={item.name}
              loading={item.slug === loading}
              perItemSize={listItemStyle.perItemSize}
              onPress={() => onPressEpisode(item)}
            />
          ))}
        </View>
      </View>
      <View style={tw`p-3 sm:hidden`}>
        <View style={tw`gap-2`}>
          {episodes.map((item, index) => (
            <Touchable
              key={index}
              style={tw`shadow-md bg-white rounded px-3 py-2`}
              onPress={() => onPressEpisode(item)}>
              <View style={tw`flex-row items-center`}>
                <View style={tw`w-10 px-3`}>
                  {item.slug === loading ? (
                    <ActivityIndicator
                      size="small"
                      color={tw.color("blue-500")}
                    />
                  ) : (
                    <IconSax name="Play" size={18} color="#000000" />
                  )}
                </View>
                <View style={tw`flex-1 px-3 py-2`}>
                  <Text size={14} style={tw`font-bold capitalize`}>
                    {!item.name.toLowerCase().includes("tập") && "Tập "}
                    {item.name}
                  </Text>
                  {item.filename && <Text size={12}>{item.filename}</Text>}
                </View>
              </View>
            </Touchable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default MoviesInfoEpisodes;
