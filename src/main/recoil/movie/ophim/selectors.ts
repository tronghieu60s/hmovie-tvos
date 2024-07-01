import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MovieType } from "./types";

export const movieInfoOPhimState = selectorFamily<MovieType | null, string>({
  key: "MovieInfoOPhimState",
  get: (slug: string) => async () => {
    const apiUrl = `/sources/ophim/movie/${slug}`;
    const movies = await axiosRequest.get(apiUrl);
    return movies.data.data;
  },
});
