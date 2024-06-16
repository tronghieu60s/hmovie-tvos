export type MoviesResponse<T = any> = {
  items: T[];
  pagination: MoviePagination;
};

export type MoviePagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

export type MovieEpisode = {
  name: string;
  slug: string;
  filename?: string;
  episodes: MovieEpisodeItem[];
};

export type MovieEpisodeItem = {
  server: string;
  linkM3u8?: string;
  linkEmbed?: string;
};

export type MovieSource = "ophim";
