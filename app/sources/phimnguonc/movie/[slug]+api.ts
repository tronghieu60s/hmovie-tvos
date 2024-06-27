import { ApiResponse } from "@/src/core/api/dto/api-result.dto";
import { getMoviePhimNguonCSlug } from "@/src/sources/phimnguonc/movie/[slug]";

export async function POST(_request: Request, { slug }: { slug: string }) {
  try {
    const response = await getMoviePhimNguonCSlug({ slug });

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
