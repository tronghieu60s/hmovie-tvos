import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MoviesType as MoviesOPhimType } from "../movie/ophim/types";
import { MoviesType as MoviesPhimNguonCType } from "../movie/phimnguonc/types";
import { MoviesResponse } from "../movie/types";

export const moviesOPhimState = selectorFamily<
  MoviesResponse<MoviesOPhimType>,
  number
>({
  key: "MoviesOPhimState",
  get: (page: number) => async () => {
    const movies = await axiosRequest.get(`/ophim/movies?page=${page}`);
    if (movies.data.success) {
      return movies.data.data;
    }
    return {
      items: [],
      pagination: {},
    };
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
    return {
      items: [],
      pagination: {},
    };
  },
});
