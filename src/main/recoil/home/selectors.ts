import { axiosRequest } from "@/src/core/api";
import { selector } from "recoil";
import { MovieListType } from "../movie/ophim/types";

export const moviesOPhimState = selector<MovieListType[]>({
  key: "MoviesOPhimState",
  get: async () => {
    const movies = await axiosRequest.get("/movie/ophim/list");
    if (movies.data.success) {
      return movies.data.data.items;
    }
    return [];
  },
});
