import { apiCaller } from "@/src/core/api";
import { isWebPlatform } from "@/src/core/config";
import { getMoviePhimNguonCSlug } from "@/src/sources/phimnguonc/movie/[slug]";
import { selectorFamily } from "recoil";
import { MovieType } from "./types";

export const movieInfoPhimNguonCState = selectorFamily<MovieType, string>({
  key: "MovieInfoPhimNguonCState",
  get: (slug: string) => async () => {
    if (isWebPlatform) {
      const apiUrl = `/sources/phimnguonc/movie/${slug}`;
      const movies = await apiCaller(apiUrl, "POST").then((res) => res.json());
      return movies.data;
    }

    const movies = await getMoviePhimNguonCSlug({ slug });
    return movies.data;
  },
});
