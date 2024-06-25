import { selectorFamily } from "recoil";
import { MovieType } from "./types";
import { apiCaller } from "@/src/core/api";

export const movieInfoOPhimState = selectorFamily<MovieType[], string>({
  key: "MovieInfoOPhimState",
  get: (slug: string) => async () => {
    const apiUrl = `/sources/ophim/movie/${slug}`;
    const movie = await apiCaller(apiUrl, "POST").then((res) => res.json());

    if (movie.success) {
      return movie.data;
    }

    return [];
  },
});
