import { axiosRequest } from "@/src/core/api";
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

  return axiosRequest.get(`${url}?${queryString}`);
};

export const moviesKKPhimSearchState = selectorFamily<
  MoviesResponse<MoviesKKPhimType> | null,
  MoviePaginationInput & { keyword: string }
>({
  key: "MoviesKKPhimSearchState",
  get:
    ({ page, limit, keyword }) =>
    async () => {
      const apiUrl = `/sources/kkphim/movies/search`;
      const movies = await getMoviesSearchApi(apiUrl, { page, limit, keyword });
      return movies.data.data;
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
      const apiUrl = `/sources/phimnguonc/movies/search`;
      const movies = await getMoviesSearchApi(apiUrl, { page, limit, keyword });
      return movies.data.data;
    },
});
