import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MoviesType as MoviesKKPhimType } from "../movie/kkphim/types";
import { MoviesType as MoviesOPhimType } from "../movie/ophim/types";
import { MoviesType as MoviesPhimNguonCType } from "../movie/phimnguonc/types";
import { MoviePaginationInput, MoviesResponse } from "../movie/types";

const getMoviesApi = (url: string, pagination: MoviePaginationInput) => {
  const { page, limit } = pagination;

  const queryParams = new URLSearchParams();
  queryParams.set("page", `${page}`);

  if (limit) {
    queryParams.set("limit", `${limit}`);
  }

  const queryString = queryParams.toString();

  return axiosRequest.get(`${url}?${queryString}`);
};

export const moviesKKPhimState = selectorFamily<
  MoviesResponse<MoviesKKPhimType> | null,
  MoviePaginationInput
>({
  key: "MoviesKKPhimState",
  get:
    ({ page, limit }) =>
    async () => {
      const apiUrl = `/sources/kkphim/movies`;
      const movies = await getMoviesApi(apiUrl, { page, limit });
      return movies.data.data;
    },
});

export const moviesOPhimState = selectorFamily<
  MoviesResponse<MoviesOPhimType> | null,
  MoviePaginationInput
>({
  key: "MoviesOPhimState",
  get:
    ({ page, limit }) =>
    async () => {
      const apiUrl = `/sources/ophim/movies`;
      const movies = await getMoviesApi(apiUrl, { page, limit });
      return movies.data.data;
    },
});

export const moviesPhimNguonCState = selectorFamily<
  MoviesResponse<MoviesPhimNguonCType> | null,
  MoviePaginationInput
>({
  key: "MoviesPhimNguonCState",
  get:
    ({ page, limit }) =>
    async () => {
      const apiUrl = `/sources/phimnguonc/movies`;
      const movies = await getMoviesApi(apiUrl, { page, limit });
      return movies.data.data;
    },
});
