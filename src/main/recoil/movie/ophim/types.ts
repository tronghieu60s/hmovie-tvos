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
  episodes: {
    name: string;
    slug: string;
    filename: string;
    episodes: {
      server: string;
      linkM3u8: string;
      linkEmbed: string;
    }[];
  }[];
};

export type MoviesType = {
  id: string;
  name: string;
  slug: string;
  originName: string;
  thumbUrl: string;
  posterUrl: string;
};
