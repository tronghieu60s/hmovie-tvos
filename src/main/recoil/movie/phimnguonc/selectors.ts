import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MovieType } from "./types";

export const movieInfoPhimNguonCState = selectorFamily<MovieType, string>({
  key: "MovieInfoPhimNguonCState",
  get: (slug: string) => async () => {
    const apiUrl = `/sources/phimnguonc/movie/${slug}`;
    const movies = await axiosRequest.get(apiUrl);
    return movies.data.data;
  },
});
