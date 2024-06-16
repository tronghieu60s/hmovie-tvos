import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MovieType } from "./types";

export const movieInfoPhimNguonCState = selectorFamily<MovieType[], string>({
  key: "MovieInfoPhimNguonCState",
  get: (slug: string) => async () => {
    const movies = await axiosRequest.get(`/phimnguonc/movie/${slug}`);
    if (movies.data.success) {
      return movies.data.data;
    }
    return [];
  },
});
