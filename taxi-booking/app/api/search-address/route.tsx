import { NextResponse } from "next/server";
const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const searchText = searchParams.get("q");
  // proximity = lat, lng
  // country = VN
  // `${BASE_URL}?q=${searchText}?language=vi&limit=4&session_token=[GENERATED-UUID]&proximity=108.2772,14.0583&country=VN&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,

  const res = await fetch(
    `${BASE_URL}?q=${searchText}?language=en&limit=4&session_token=[GENERATED-UUID]&proximity=-83.748708,42.265837&country=US&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const searchResult = await res.json();

  return NextResponse.json({ data: searchResult });
}
