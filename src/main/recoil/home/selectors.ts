import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MoviesType as MoviesOPhimType } from "../movie/ophim/types";
import { MoviesType as MoviesPhimNguonCType } from "../movie/phimnguonc/types";
import { MoviesType as MoviesKKPhimType } from "../movie/kkphim/types";
import { MoviesResponse } from "../movie/types";

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

      const movies = await axiosRequest.get(`/ophim/movies?${queryString}`);
      if (movies.data.success) {
        return movies.data.data;
      }

      return { items: [], pagination: {} };
    },
});

export const moviesPhimNguonCState = selectorFamily<
  MoviesResponse<MoviesPhimNguonCType>,
  number
>({
  key: "MoviesPhimNguonCState",
  get: (page: number) => async () => {
    const movies = await axiosRequest.get(`/phimnguonc/movies?page=${page}`);
    if (movies.data.success) {
      return movies.data.data;
    }
    return { items: [], pagination: {} };
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

      const movies = await axiosRequest.get(`/kkphim/movies?${queryString}`);
      if (movies.data.success) {
        return movies.data.data;
      }

      return { items: [], pagination: {} };
    },
});
