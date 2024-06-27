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
      let movies = null;

      if (isDev && isWebPlatform) {
        movies = await getMoviesApi("/sources/animehay/movies", {
          page,
          limit,
        });
      } else {
        movies = await getMoviesAnimeHay({ page, limit });
      }

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
      const movies = await getMoviesApi("/sources/kkphim/movies", {
        page,
        limit,
      });

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
      const movies = await getMoviesApi("/sources/ophim/movies", {
        page,
        limit,
      });

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
      let movies = null;

      if (isDev && isWebPlatform) {
        movies = await getMoviesApi("/sources/phimmoichill/movies", {
          page,
          limit,
        });
      } else {
        movies = await getMoviesPhimMoiChill({ page, limit });
      }

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
      const movies = await getMoviesApi("/sources/phimnguonc/movies", {
        page,
        limit,
      });

      return movies.data as MoviesResponse<MoviesPhimNguonCType> | null;
    },
});
