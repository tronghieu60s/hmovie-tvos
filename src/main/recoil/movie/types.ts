export type MovieEpisode = {
  name: string;
  slug: string;
  filename: string;
  episodes: MovieEpisodeItem[];
};

export type MovieEpisodeItem = {
  server: string;
  linkM3u8: string;
  linkEmbed: string;
};

export type MovieSource = "ophim";
