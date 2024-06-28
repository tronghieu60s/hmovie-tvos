import { ApiResponse } from "@/src/core/api/dto/api-result.dto";
import { MoviePaginationInput } from "@/src/main/recoil/movie/types";

const apiUrl = "https://phimapi.com/v1/api/tim-kiem";

export async function getMoviesKKPhimSearch(
  params: MoviePaginationInput & { keyword: string },
) {
  const { page: _page = 1, limit: _limit = 24, keyword = "" } = params;

  try {
    if (!keyword) {
      throw new Error("Keyword is required");
    }

    let limit = Number(_limit);
    const page = Number(_page);

    if (limit < 10) {
      limit = 10;
    } else if (limit > 50) {
      limit = 50;
    }

    const params = new URLSearchParams();
    params.append("limit", `${page * limit}`);
    params.append("keyword", `${keyword}`);

    const queryString = params.toString();

    const apiReq = `${apiUrl}?${queryString}`;
    console.info(apiReq);

    const response = await fetch(apiReq).then((res) => res.json());

    const pathImage = response.data.APP_DOMAIN_CDN_IMAGE;
    const totalItems = response.data.params.pagination.totalItems;

    const moviesItems = response.data.items.slice(
      page * limit - limit,
      page * limit,
    );

    const items = moviesItems.map((item: any) => ({
      name: item.name,
      slug: item.slug,
      originName: item.origin_name,
      thumbUrl: `${pathImage}/${item.thumb_url}`,
      posterUrl: `${pathImage}/${item.poster_url}`,
      source: "kkphim",
    }));

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
