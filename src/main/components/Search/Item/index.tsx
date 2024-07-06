import { calculateListItemStyle } from "@/src/core/commonFuncs";
import { MovieSource } from "@/src/main/recoil/movie/types";
import { moviesListSearchState } from "@/src/main/recoil/search/selectors";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";
import { useRecoilValueLoadable } from "recoil";
import MoviesListPortrait from "../../Movies/List/Portrait";
import MoviesListPortraitSkeleton from "../../Movies/List/Portrait/Skeleton";

type Props = {
  width: number;
  source: MovieSource;
};

const SearchItem = (props: Props) => {
  const { width, source } = props;
  const { keyword = "" } = useLocalSearchParams();

  const { state, contents: movies } = useRecoilValueLoadable(
    moviesListSearchState({
      page: 1,
      limit: 10,
      source,
      keyword: String(keyword),
    }),
  );

  const listItemStyle = useMemo(() => calculateListItemStyle(width), [width]);

  if (state === "hasError") {
    return null;
  }

  return (
    <View>
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

export default SearchItem;
