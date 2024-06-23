import tw from "@/src/core/tailwind";
import { Pagination } from "@/src/main/base/Flowbite/Pagination";
import { MoviesResponse } from "@/src/main/recoil/movie/types";
import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";
import MoviesItemPortrait from "./Item";

type Props = {
  movies: MoviesResponse;
  gapSize?: number;
  perItemSize?: number;
  onPageChange?: (page: number) => void;
};

const MoviesListPortrait = (props: Props) => {
  const {
    movies: { items, pagination },
    gapSize = 15,
    perItemSize = scale(100),
    onPageChange,
  } = props;

  return (
    <View style={tw`py-3 gap-5`}>
      <View style={tw`flex-row flex-wrap gap-[${gapSize}px]`}>
        {items.map((movie, index) => (
          <MoviesItemPortrait
            key={index}
            {...movie}
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
