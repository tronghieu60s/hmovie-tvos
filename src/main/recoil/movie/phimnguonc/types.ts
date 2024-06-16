import { MovieEpisode } from "../types";

export type MovieType = {
  id: string;
  name: string;
  slug: string;
  originName: string;
  content: string;
  thumbUrl: string;
  posterUrl: string;
  totalEpisodes: string;
  currentEpisode: string;
  quality: "HD";
  duration: string;
  language: "Vietsub";
  casts: string[];
  directors: string[];
  taxonomies: {
    group: { name: string; slug: string };
    categories: { name: string; slug: string }[];
  }[];
  episodes: MovieEpisode[];
  source: "phimnguonc";
};

export type MoviesType = {
  id: string;
  name: string;
  slug: string;
  originName: string;
  content: string;
  thumbUrl: string;
  posterUrl: string;
  totalEpisodes: string;
  currentEpisode: string;
  quality: "HD";
  language: "Vietsub";
  casts: string[];
  directors: string[];
  source: "phimnguonc";
};
