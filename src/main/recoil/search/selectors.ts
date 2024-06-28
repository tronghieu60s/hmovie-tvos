import { apiCaller } from "@/src/core/api";
import { isWebPlatform } from "@/src/core/config";
import { getMoviesKKPhimSearch } from "@/src/sources/kkphim/movies/search";
import { getMoviesPhimNguonCSearch } from "@/src/sources/phimnguonc/movies/search";
import { selectorFamily } from "recoil";
import { MoviesType as MoviesKKPhimType } from "../movie/kkphim/types";
import { MoviesType as MoviesPhimNguonCType } from "../movie/phimnguonc/types";
import { MoviePaginationInput, MoviesResponse } from "../movie/types";

const getMoviesSearchApi = (
  url: string,
  pagination: MoviePaginationInput & { keyword: string },
) => {
  const { page, limit, keyword } = pagination;

  const queryParams = new URLSearchParams();
  queryParams.set("page", `${page}`);

  if (limit) {
    queryParams.set("limit", `${limit}`);
  }

  queryParams.set("keyword", `${keyword}`);

  const queryString = queryParams.toString();

  return apiCaller(`${url}?${queryString}`, "POST").then((res) => res.json());
};

export const moviesKKPhimSearchState = selectorFamily<
  MoviesResponse<MoviesKKPhimType> | null,
  MoviePaginationInput & { keyword: string }
>({
  key: "MoviesKKPhimSearchState",
  get:
    ({ page, limit, keyword }) =>
    async () => {
      if (isWebPlatform) {
        const movies = await getMoviesSearchApi(
          "/sources/kkphim/movies/search",
          {
            page,
            limit,
            keyword,
          },
        );
        return movies.data as MoviesResponse<MoviesKKPhimType> | null;
      }

      const movies = await getMoviesKKPhimSearch({ page, limit, keyword });
      return movies.data as MoviesResponse<MoviesKKPhimType> | null;
    },
});

export const moviesPhimNguonCSearchState = selectorFamily<
  MoviesResponse<MoviesPhimNguonCType> | null,
  MoviePaginationInput & { keyword: string }
>({
  key: "MoviesPhimNguonCSearchState",
  get:
    ({ page, limit, keyword }) =>
    async () => {
      if (isWebPlatform) {
        const movies = await getMoviesSearchApi(
          "/sources/phimnguonc/movies/search",
          { page, limit, keyword },
        );
        return movies.data as MoviesResponse<MoviesPhimNguonCType> | null;
      }

      const movies = await getMoviesPhimNguonCSearch({ page, limit, keyword });
      return movies.data as MoviesResponse<MoviesPhimNguonCType> | null;
    },
});
