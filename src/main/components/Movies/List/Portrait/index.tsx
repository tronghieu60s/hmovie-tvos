import tw from "@/src/core/tailwind";
import { Pagination } from "@/src/main/base/Flowbite/Pagination";
import { MoviesResponse } from "@/src/main/recoil/movie/types";
import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import MoviesError from "../../Error";
import MoviesItemPortrait from "./Item";

type Props = {
  movies: MoviesResponse | null;
  gapSize: number;
  perItemSize: number;
  onPageChange?: (page: number) => void;
};

const MoviesListPortrait = (props: Props) => {
  const { movies, gapSize, perItemSize, onPageChange } = props;

  if (!movies || !movies?.items.length) {
    return <MoviesError />;
  }

  const { items, pagination } = movies || {};

  return (
    <View style={tw`py-3 gap-5`}>
      <View style={tw`flex-row flex-wrap gap-[${gapSize}px]`}>
        {items.map((movie, index) => (
          <Link
            key={index}
            href={{
              params: { slug: movie.slug },
              pathname: `/sources/${movie.source}/movie/[slug]`,
            }}
            asChild>
            <MoviesItemPortrait
              {...movie}
              hasTVPreferredFocus={index === 0}
              perItemSize={perItemSize}
            />
          </Link>
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
