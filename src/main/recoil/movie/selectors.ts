import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MoviesItem, MovieSource } from "./types";

export const movieInfoState = selectorFamily<
  MoviesItem,
  { slug: string; source: MovieSource }
>({
  key: "MovieInfoState",
  get:
    ({ slug, source }) =>
    async () => {
      const apiUrl = `/sources/${source}/movie/${slug}`;
      const movies = await axiosRequest.get(apiUrl);
      return movies.data.data;
    },
});
