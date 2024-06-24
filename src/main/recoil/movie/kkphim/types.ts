import { MovieEpisode } from "../types";

export type MovieType = {
  id: string;
  name: string;
  slug: string;
  type: "series";
  status: "ongoing";
  originName: string;
  content: string;
  thumbUrl: string;
  posterUrl: string;
  trailerUrl: string;
  totalEpisodes: string;
  currentEpisode: string;
  quality: "HD";
  duration: string;
  language: "Vietsub";
  showtimes: string;
  publishYear: number;
  casts: string[];
  directors: string[];
  categories: string[];
  countries: string[];
  isTheater: boolean;
  isCopyright: boolean;
  episodes: MovieEpisode[];
  source: "kkphim";
};

export type MoviesType = {
  id: string;
  name: string;
  slug: string;
  originName: string;
  thumbUrl: string;
  posterUrl: string;
  source: "kkphim";
};
