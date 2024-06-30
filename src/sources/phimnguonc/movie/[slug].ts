import { apiCaller } from "@/src/core/api";
import { getSlug } from "@/src/core/api/commonFuncs";
import { ApiResponse } from "@/src/core/api/dto/api-result.dto";

const apiUrl = "https://phim.nguonc.com/api/film";

export async function getMoviePhimNguonCSlug(params: { slug: string }) {
  const { slug } = params;

  try {
    const apiReq = `${apiUrl}/${slug}`;
    const movie = await apiCaller(apiReq).then((res) => res.json());

    const data = {
      id: movie.movie.id,
      slug: movie.movie.slug,
      name: movie.movie.name,
      originName: movie.movie.original_name,
      content: movie.movie.description,
      thumbUrl: movie.movie.thumb_url,
      posterUrl: movie.movie.poster_url,
      totalEpisodes: movie.movie.total_episodes,
      currentEpisode: movie.movie.current_episode,
      quality: movie.movie.quality,
      duration: movie.movie.time,
      language: movie.movie.language,
      casts: (movie.movie.casts || "")
        .split(",")
        .map((item: string) => item.trim())
        .filter((item: string) => item),
      directors: (movie.movie.director || "")
        ?.split(",")
        .map((item: string) => item.trim())
        .filter((item: string) => item),
      taxonomies: Object.values(movie.movie.category).map((item: any) => ({
        group: {
          name: item.group.name,
          slug: getSlug(item.group.name),
        },
        categories: item.list.map((data: any) => ({
          name: data.name,
          slug: getSlug(data.name),
        })),
      })),
      episodes: Object.entries(
        movie.movie.episodes
          .flatMap((ep: any) =>
            ep.items
              .map((data: any) => ({
                name: data.name,
                slug: data.slug,
                server: ep.server_name,
                linkEmbed: data.embed,
              }))
              .filter((data: any) => data.name),
          )
          .reduce((acc: any, cur: any) => {
            if (!acc[cur.name])
              acc[cur.name] = {
                name: cur.name,
                slug: cur.slug,
                filename: cur.filename,
                episodes: [],
              };
            acc[cur.name].episodes.push({
              server: cur.server,
              linkEmbed: cur.linkEmbed,
            });
            return acc;
          }, {}),
      ).map(([, v]) => v),
      source: "phimnguonc",
    };

    return new ApiResponse({ data });
  } catch (error: any) {
    return new ApiResponse({
      data: null,
      message: `${error.message || error}`,
      success: false,
    });
  }
}
