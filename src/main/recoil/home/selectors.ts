import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import {
  MoviePaginationInput,
  MovieSource,
  MoviesResponse,
} from "../movie/types";

export const moviesListState = selectorFamily<
  MoviesResponse | null,
  MoviePaginationInput & { source: MovieSource }
>({
  key: "MoviesListState",
  get:
    ({ page, limit, source }) =>
    async () => {
      const apiUrl = `/sources/${source}/movies`;

      const queryParams = new URLSearchParams();
      queryParams.set("page", `${page}`);

      if (limit) {
        queryParams.set("limit", `${limit}`);
      }

      const queryString = queryParams.toString();

      const movies = await axiosRequest.get(`${apiUrl}?${queryString}`);
      return movies.data.data;
    },
});
