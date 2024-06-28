import { useRecoilValueLoadable } from "recoil";
import MoviesListPortrait from "../../Movies/List/Portrait";
import { moviesKKPhimSearchState } from "@/src/main/recoil/search/selectors";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { useMemo } from "react";
import { calculateListItemStyle } from "@/src/core/commonFuncs";
import { Text } from "@/src/main/base/Native/Text";
import tw from "@/src/core/tailwind";
import MoviesListPortraitSkeleton from "../../Movies/List/Portrait/Skeleton";

const SearchSourcesKKPhim = ({ width }: { width: number }) => {
  const { keyword = "" } = useLocalSearchParams();

  const { state, contents: movies } = useRecoilValueLoadable(
    moviesKKPhimSearchState({ page: 1, limit: 10, keyword: String(keyword) }),
  );

  const listItemStyle = useMemo(() => calculateListItemStyle(width), [width]);

  if (state === "hasError") {
    return null;
  }

  return (
    <View>
      <Text size={16} style={tw`text-black font-bold`}>
        KK Phim
      </Text>
      {state === "hasValue" && (
        <MoviesListPortrait
          movies={movies}
          gapSize={listItemStyle.gapSize}
          perItemSize={listItemStyle.perItemSize}
        />
      )}
      {state === "loading" && (
        <MoviesListPortraitSkeleton
          gapSize={listItemStyle.gapSize}
          perItemSize={listItemStyle.perItemSize}
          numberOfItems={listItemStyle.numberOfItems}
        />
      )}
    </View>
  );
};

export default SearchSourcesKKPhim;
