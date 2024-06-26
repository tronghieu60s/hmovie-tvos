import { ApiResponse } from "@/src/core/api/dto/api-result.dto";
import { getMoviesPhimMoiChill } from "@/src/sources/phimmoichill/movies";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  const _page = searchParams.get("page") || 1;
  const _limit = searchParams.get("limit") || 24;

  try {
    const response = await getMoviesPhimMoiChill({
      page: Number(_page),
      limit: Number(_limit),
    });

    return Response.json(response, {
      headers: {
        "Cache-Control": "max-age=10",
        "CDN-Cache-Control": "max-age=60",
        "Vercel-CDN-Cache-Control": "max-age=3600",
      },
    });
  } catch (error: any) {
    return Response.json(
      new ApiResponse({
        data: null,
        message: `${error.message || error}`,
        success: false,
      }),
      { status: 500 },
    );
  }
}
