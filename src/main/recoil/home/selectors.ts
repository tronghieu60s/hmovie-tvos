import { apiCaller } from "@/src/core/api";
import { getMoviesAnimeHay } from "@/src/sources/animehay/movies";
import { getMoviesPhimMoiChill } from "@/src/sources/phimmoichill/movies";
import { selectorFamily } from "recoil";
import { MoviesType as MoviesAnimeHayType } from "../movie/animehay/types";
import { MoviesType as MoviesKKPhimType } from "../movie/kkphim/types";
import { MoviesType as MoviesOPhimType } from "../movie/ophim/types";
import { MoviesType as MoviesPhimMoiChillType } from "../movie/phimmoichill/types";
import { MoviesType as MoviesPhimNguonCType } from "../movie/phimnguonc/types";
import { MoviesResponse } from "../movie/types";

export const moviesAnimeHayState = selectorFamily<
  MoviesResponse<MoviesAnimeHayType>,
  { page: number; limit: number }
>({
  key: "MoviesAnimeHayState",
  get:
    ({ page, limit }) =>
    async () => {
      const movies = await getMoviesAnimeHay({ page, limit });

      if (movies.success) {
        return movies.data as any;
      }

      return { items: [], pagination: null };
    },
});

export const moviesKKPhimState = selectorFamily<
  MoviesResponse<MoviesKKPhimType>,
  { page: number; limit?: number }
>({
  key: "MoviesKKPhimState",
  get:
    ({ page, limit }) =>
    async () => {
      const queryParams = new URLSearchParams();
      queryParams.set("page", `${page}`);

      if (limit) {
        queryParams.set("limit", `${limit}`);
      }

      const queryString = queryParams.toString();

      const apiUrl = `/sources/kkphim/movies?${queryString}`;
      const movies = await apiCaller(apiUrl, "POST").then((res) => res.json());

      if (movies.success) {
        return movies.data;
      }

      return { items: [], pagination: null };
    },
});

export const moviesOPhimState = selectorFamily<
  MoviesResponse<MoviesOPhimType>,
  { page: number; limit?: number }
>({
  key: "MoviesOPhimState",
  get:
    ({ page, limit }) =>
    async () => {
      const queryParams = new URLSearchParams();
      queryParams.set("page", `${page}`);

      if (limit) {
        queryParams.set("limit", `${limit}`);
      }

      const queryString = queryParams.toString();

      const apiUrl = `/sources/ophim/movies?${queryString}`;
      const movies = await apiCaller(apiUrl, "POST").then((res) => res.json());

      if (movies.success) {
        return movies.data;
      }

      return { items: [], pagination: null };
    },
});

export const moviesPhimMoiChillState = selectorFamily<
  MoviesResponse<MoviesPhimMoiChillType>,
  { page: number; limit: number }
>({
  key: "MoviesPhimMoiChillState",
  get:
    ({ page, limit }) =>
    async () => {
      const movies = await getMoviesPhimMoiChill({ page, limit });

      if (movies.success) {
        return movies.data as any;
      }

      return { items: [], pagination: null };
    },
});

export const moviesPhimNguonCState = selectorFamily<
  MoviesResponse<MoviesPhimNguonCType>,
  { page: number; limit?: number }
>({
  key: "MoviesPhimNguonCState",
  get:
    ({ page, limit }) =>
    async () => {
      const queryParams = new URLSearchParams();
      queryParams.set("page", `${page}`);

      if (limit) {
        queryParams.set("limit", `${limit}`);
      }

      const queryString = queryParams.toString();

      const apiUrl = `/sources/phimnguonc/movies?${queryString}`;
      const movies = await apiCaller(apiUrl, "POST").then((res) => res.json());

      if (movies.success) {
        return movies.data;
      }

      return { items: [], pagination: null };
    },
});
