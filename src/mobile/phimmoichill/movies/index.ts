import { getPaginationNewPerPage } from "@/src/core/api/commonFuncs";
import { ApiResponse } from "@/src/core/api/dto/api-result.dto";
import * as cheerio from "cheerio";

const apiUrl = "https://phimmoichillu.net/tim-kiem//page-";
const pageSize = 25;

export async function getMoviesPhimMoiChill(params: {
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
    let totalPages = 0;

    do {
      const apiReq = `${apiUrl}-${queryPage}`;
      console.info(apiReq);

      const response = await fetch(apiReq).then((res) => res.text());

      queryPage += 1;

      if (response) {
        const $ = cheerio.load(response);
        const items = $(".list-film .item");

        const itemsData = Array.from(items).map((item) => {
          const href = $(item).children("a").attr("href");

          const id = href?.split("-")?.pop()?.replace("pm", "") || "";
          const name = $(item).children("a").attr("title") || "";
          const slug = href?.split("/")?.pop()?.replace(".html", "") || "";
          const thumbUrl = $(item).find("img").attr("src") || "";
          const posterUrl = $(item).find("img").attr("src") || "";
          return {
            id,
            name,
            slug,
            thumbUrl,
            posterUrl,
          };
        });

        movies.push(...itemsData);
      }
    } while (queryPage <= endPage);

    const startIndex = startRecord - pageSize * (startPage - 1) - 1;
    const endIndex = endRecord - pageSize * (startPage - 1);

    const items = movies.slice(startIndex, endIndex);

    const pagination = {
      page: page,
      limit: limit,
      totalPages: totalPages,
      totalItems: totalPages * limit,
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
