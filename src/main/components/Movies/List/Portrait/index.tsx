import tw from "@/src/core/tailwind";
import { Pagination } from "@/src/main/base/Flowbite/Pagination";
import { MoviesResponse } from "@/src/main/recoil/movie/types";
import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import MoviesItemPortrait from "./Item";
import MoviesError from "../../Error";

type Props = {
  movies: MoviesResponse | null;
  gapSize?: number;
  perItemSize?: number;
  onPageChange?: (page: number) => void;
};

const MoviesListPortrait = (props: Props) => {
  const {
    movies,
    gapSize = 15,
    perItemSize = scale(100),
    onPageChange,
  } = props;

  if (!movies || !movies?.items.length) {
    return <MoviesError />;
  }

  const { items, pagination } = movies || {};

  return (
    <View style={tw`py-3 gap-5`}>
      <View style={tw`flex-row flex-wrap gap-[${gapSize}px]`}>
        {items.map((movie, index) => (
          <MoviesItemPortrait
            key={index}
            {...movie}
            hasTVPreferredFocus={index === 0}
            perItemSize={perItemSize}
          />
        ))}
      </View>
      {onPageChange && (
        <Pagination
          pageSize={pagination.limit}
          currentPage={pagination.page}
          totalItems={pagination.totalItems}
          onPageChange={onPageChange}
        />
      )}
    </View>
  );
};

export default MoviesListPortrait;
