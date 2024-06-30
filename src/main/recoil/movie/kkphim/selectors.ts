import { apiCaller } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MovieType } from "./types";
import { getMovieKKPhimSlug } from "@/src/sources/kkphim/movie/[slug]";
import { isWebPlatform } from "@/src/core/config";

export const movieInfoKKPhimState = selectorFamily<MovieType | null, string>({
  key: "MovieInfoKKPhimState",
  get: (slug: string) => async () => {
    if (isWebPlatform) {
      const apiUrl = `/sources/kkphim/movie/${slug}`;
      const movies = await apiCaller(apiUrl, "POST").then((res) => res.json());
      return movies.data;
    }

    const movies = await getMovieKKPhimSlug({ slug });
    return movies.data;
  },
});
