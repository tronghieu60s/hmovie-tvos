export function POST(request: Request, { slug }: { slug: string }) {
  console.log(slug);

  const { searchParams } = new URL(request.url);

  const _page = searchParams.get("page") || 1;
  const _limit = searchParams.get("limit") || 24;

  console.log(_page, _limit);
  return Response.json({ hello: "world" });
}
