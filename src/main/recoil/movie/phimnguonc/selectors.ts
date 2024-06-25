import { apiCaller } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MovieType } from "./types";

export const movieInfoPhimNguonCState = selectorFamily<MovieType, string>({
  key: "MovieInfoPhimNguonCState",
  get: (slug: string) => async () => {
    const apiUrl = `/sources/phimnguonc/movie/${slug}`;
    const movie = await apiCaller(apiUrl, "POST").then((res) => res.json());

    if (movie.success) {
      return movie.data;
    }

    return null;
  },
});
