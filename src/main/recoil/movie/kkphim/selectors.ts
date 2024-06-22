import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MovieType } from "./types";

export const movieInfoKKPhimState = selectorFamily<MovieType[], string>({
  key: "MovieInfoKKPhimState",
  get: (slug: string) => async () => {
    const movies = await axiosRequest.get(`/kkphim/movie/${slug}`);
    if (movies.data.success) {
      return movies.data.data;
    }
    return [];
  },
});
