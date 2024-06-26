import { getPaginationNewPerPage } from "@/src/core/api/commonFuncs";
import { ApiResponse } from "@/src/core/api/dto/api-result.dto";

const apiUrl = "https://phim.nguonc.com/api/films/phim-moi-cap-nhat";
const pageSize = 10;

export async function getMoviesPhimNguonC(params: {
  page: number;
  limit: number;
}) {
  const { page: _page, limit: _limit } = params;

  try {
    let limit = Number(_limit);
    const page = Number(_page);

    if (limit < 10) {
      limit = 10;
    } else if (limit > 50) {
      limit = 50;
    }

    const movies = [];

    const { startPage, endPage, startRecord, endRecord } =
      getPaginationNewPerPage(page, pageSize, limit);

    let queryPage = startPage;
    let totalItems = 0;

    do {
      const params = new URLSearchParams();
      params.set("page", `${queryPage}`);

      const queryString = params.toString();

      const apiReq = `${apiUrl}?${queryString}`;
      console.info(apiReq);

      const response = await fetch(apiReq).then((res) => res.json());

      queryPage += 1;

      if (response) {
        if (!totalItems) {
          totalItems = response.paginate.total_items;
        }

        const itemsData = response.items.map((item: any) => ({
          name: item.name,
          slug: item.slug,
          originName: item.original_name,
          thumbUrl: item.thumb_url,
          posterUrl: item.poster_url,
          content: item.description,
          totalEpisodes: item.total_episodes,
          currentEpisode: item.current_episode,
          quality: item.quality,
          duration: item.item,
          language: item.language,
          casts: (item.casts || "")
            .split(",")
            .map((item: string) => item.trim())
            .filter((item: string) => item),
          directors: (item.director || "")
            ?.split(",")
            .map((item: string) => item.trim())
            .filter((item: string) => item),
          source: "phimnguonc",
        }));

        movies.push(...itemsData);
      }
    } while (queryPage <= endPage);

    const startIndex = startRecord - pageSize * (startPage - 1) - 1;
    const endIndex = endRecord - pageSize * (startPage - 1);

    const items = movies.slice(startIndex, endIndex);

    const pagination = {
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    };

    return new ApiResponse({ data: { items, pagination } });
  } catch (error: any) {
    return new ApiResponse({
      data: null,
      message: `${error.message || error}`,
      success: false,
    });
  }
}
