import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MovieType } from "./types";

export const movieInfoOPhimState = selectorFamily<MovieType[], string>({
  key: "MovieInfoOPhimState",
  get: (slug: string) => async () => {
    const movies = await axiosRequest.get(`/ophim/movie/${slug}`);
    if (movies.data.success) {
      return movies.data.data;
    }
    return [];
  },
});
