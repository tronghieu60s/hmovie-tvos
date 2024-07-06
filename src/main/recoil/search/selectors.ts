import { axiosRequest } from "@/src/core/api";
import { selectorFamily } from "recoil";
import {
  MoviePaginationInput,
  MovieSource,
  MoviesResponse,
} from "../movie/types";

export const moviesListSearchState = selectorFamily<
  MoviesResponse | null,
  MoviePaginationInput & { source: MovieSource; keyword: string }
>({
  key: "MoviesListSearchState",
  get:
    ({ page, limit, source, keyword }) =>
    async () => {
      const apiUrl = `/sources/${source}/movies/search`;

      const queryParams = new URLSearchParams();
      queryParams.set("page", `${page}`);

      if (limit) {
        queryParams.set("limit", `${limit}`);
      }

      queryParams.set("keyword", `${keyword}`);

      const queryString = queryParams.toString();

      const movies = await axiosRequest.get(`${apiUrl}?${queryString}`);
      return movies.data.data;
    },
});
