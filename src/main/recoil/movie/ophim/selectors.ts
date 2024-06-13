import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import { MovieInfoType } from "./types";

export const movieOPhimInfoState = selectorFamily<MovieInfoType[], string>({
  key: "MovieOPhimInfoState",
  get: (slug: string) => async () => {
    const movies = await axiosRequest.get(`/movie/ophim/info/${slug}`);
    if (movies.data.success) {
      return movies.data.data;
    }
    return [];
  },
});
