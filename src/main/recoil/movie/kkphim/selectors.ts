import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MovieType } from "./types";

export const movieInfoKKPhimState = selectorFamily<MovieType | null, string>({
  key: "MovieInfoKKPhimState",
  get: (slug: string) => async () => {
    const apiUrl = `/sources/kkphim/movie/${slug}`;
    const movies = await axiosRequest.get(apiUrl);
    return movies.data.data;
  },
});
