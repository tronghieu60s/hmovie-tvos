export type MoviesList = {
  id: string;
  name: string;
  slug: string;
  originName?: string;
  thumbUrl: string;
  posterUrl: string;
  source: MovieSource;
};

export type MoviesItem = {
  id: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  originName: string;
  content: string;
  thumbUrl: string;
  posterUrl: string;
  trailerUrl: string;
  totalEpisodes: string;
  currentEpisode: string;
  quality: string;
  duration: string;
  language: string;
  showTimes: string;
  publishYear: number;
  casts: string[];
  directors: string[];
  categories: string[];
  countries: string[];
  isTheater: boolean;
  isCopyright: boolean;
  episodes: MovieEpisode[];
  source: "ophim";
};

export type MovieEpisode = {
  name: string;
  slug: string;
  filename?: string;
  episodes?: MovieEpisodeItem[];
};

export type MovieEpisodeItem = {
  server: string;
  isProxy?: boolean;
  linkM3u8?: string;
  linkEmbed?: string;
};

export type MovieSource = "animehay" | "ophim" | "kkphim" | "phimnguonc";

export type MoviesResponse = {
  items: MoviesList[];
  pagination: MoviePagination;
};

export type MoviePagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

export type MoviePaginationInput = {
  page: number;
  limit: number;
};
