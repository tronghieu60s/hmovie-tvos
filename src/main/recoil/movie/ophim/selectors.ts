import { selectorFamily } from "recoil";
import { MovieType } from "./types";
import { apiCaller } from "@/src/core/api";
import { isWebPlatform } from "@/src/core/config";
import { getMovieOPhimSlug } from "@/src/sources/ophim/movie/[slug]";

export const movieInfoOPhimState = selectorFamily<MovieType | null, string>({
  key: "MovieInfoOPhimState",
  get: (slug: string) => async () => {
    if (isWebPlatform) {
      const apiUrl = `/sources/ophim/movie/${slug}`;
      const movies = await apiCaller(apiUrl, "POST").then((res) => res.json());
      return movies.data;
    }

    const movies = await getMovieOPhimSlug({ slug });
    return movies.data;
  },
});
