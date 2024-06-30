import { apiCaller } from "@/src/core/api";
import { getMoviesAnimeHay } from "@/src/sources/animehay/movies";
import { getMoviesPhimMoiChill } from "@/src/sources/phimmoichill/movies";
import { selectorFamily } from "recoil";
import { MoviesType as MoviesAnimeHayType } from "../movie/animehay/types";
import { MoviesType as MoviesKKPhimType } from "../movie/kkphim/types";
import { MoviesType as MoviesOPhimType } from "../movie/ophim/types";
import { MoviesType as MoviesPhimMoiChillType } from "../movie/phimmoichill/types";
import { MoviesType as MoviesPhimNguonCType } from "../movie/phimnguonc/types";
import { MoviePaginationInput, MoviesResponse } from "../movie/types";
import { isDev, isWebPlatform } from "@/src/core/config";
import { getMoviesOPhim } from "@/src/sources/ophim/movies";
import { getMoviesKKPhim } from "@/src/sources/kkphim/movies";
import { getMoviesPhimNguonC } from "@/src/sources/phimnguonc/movies";

const getMoviesApi = (url: string, pagination: MoviePaginationInput) => {
  const { page, limit } = pagination;

  const queryParams = new URLSearchParams();
  queryParams.set("page", `${page}`);

  if (limit) {
    queryParams.set("limit", `${limit}`);
  }

  const queryString = queryParams.toString();

  return apiCaller(`${url}?${queryString}`, "POST").then((res) => res.json());
};

export const moviesAnimeHayState = selectorFamily<
  MoviesResponse<MoviesAnimeHayType> | null,
  MoviePaginationInput
>({
  key: "MoviesAnimeHayState",
  get:
    ({ page, limit }) =>
    async () => {
      if (isDev && isWebPlatform) {
        const apiUrl = `/sources/animehay/movies`;
        const movies = await getMoviesApi(apiUrl, { page, limit });
        return movies.data as MoviesResponse<MoviesAnimeHayType> | null;
      }

      const movies = await getMoviesAnimeHay({ page, limit });
      return movies.data as MoviesResponse<MoviesAnimeHayType> | null;
    },
});

export const moviesKKPhimState = selectorFamily<
  MoviesResponse<MoviesKKPhimType> | null,
  MoviePaginationInput
>({
  key: "MoviesKKPhimState",
  get:
    ({ page, limit }) =>
    async () => {
      if (isWebPlatform) {
        const apiUrl = `/sources/kkphim/movies`;
        const movies = await getMoviesApi(apiUrl, { page, limit });
        return movies.data as MoviesResponse<MoviesKKPhimType> | null;
      }

      const movies = await getMoviesKKPhim({ page, limit });
      return movies.data as MoviesResponse<MoviesKKPhimType> | null;
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
      if (isWebPlatform) {
        const apiUrl = `/sources/ophim/movies`;
        const movies = await getMoviesApi(apiUrl, { page, limit });
        return movies.data as MoviesResponse<MoviesOPhimType> | null;
      }

      const movies = await getMoviesOPhim({ page, limit });
      return movies.data as MoviesResponse<MoviesOPhimType> | null;
    },
});

export const moviesPhimMoiChillState = selectorFamily<
  MoviesResponse<MoviesPhimMoiChillType> | null,
  MoviePaginationInput
>({
  key: "MoviesPhimMoiChillState",
  get:
    ({ page, limit }) =>
    async () => {
      if (isDev && isWebPlatform) {
        const apiUrl = `/sources/phimmoichill/movies`;
        const movies = await getMoviesApi(apiUrl, { page, limit });
        return movies.data as MoviesResponse<MoviesPhimMoiChillType> | null;
      }

      const movies = await getMoviesPhimMoiChill({ page, limit });
      return movies.data as MoviesResponse<MoviesPhimMoiChillType> | null;
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
      if (isWebPlatform) {
        const apiUrl = `/sources/phimnguonc/movies`;
        const movies = await getMoviesApi(apiUrl, { page, limit });
        return movies.data as MoviesResponse<MoviesPhimNguonCType> | null;
      }

      const movies = await getMoviesPhimNguonC({ page, limit });
      return movies.data as MoviesResponse<MoviesPhimNguonCType> | null;
    },
});
