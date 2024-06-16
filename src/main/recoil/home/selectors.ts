import { axiosRequest } from "@/src/core/api";
import { selector } from "recoil";
import { MoviesType } from "../movie/ophim/types";

export const moviesOPhimState = selector<MoviesType[]>({
  key: "MoviesOPhimState",
  get: async () => {
    const movies = await axiosRequest.get("/ophim/movies");
    if (movies.data.success) {
      return movies.data.data.items;
    }
    return [];
  },
});

export const moviesPhimNguonCState = selector<MoviesType[]>({
  key: "MoviesPhimNguonCState",
  get: async () => {
    const movies = await axiosRequest.get("/phimnguonc/movies");
    if (movies.data.success) {
      return movies.data.data.items;
    }
    return [];
  },
});
