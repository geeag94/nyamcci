import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nx = searchParams.get("nx");
  const ny = searchParams.get("ny");

  if (!nx || !ny) {
    return NextResponse.json(
      { error: "nx and ny are required" },
      { status: 400 }
    );
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = now.getHours();

  const announcementHours = [2, 5, 8, 11, 14, 17, 20, 23];
  let baseHour = announcementHours[0];
  for (let i = announcementHours.length - 1; i >= 0; i--) {
    if (hours >= announcementHours[i]) {
      baseHour = announcementHours[i];
      break;
    }
  }

  const baseDate = `${year}${month}${day}`;
  const baseTime = `${String(baseHour).padStart(2, "0")}00`;

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";
  
  const url = new URL(
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst"
  );
  url.searchParams.set("serviceKey", decodeURIComponent(apiKey));
  url.searchParams.set("pageNo", "1");
  url.searchParams.set("numOfRows", "1000");
  url.searchParams.set("dataType", "JSON");
  url.searchParams.set("base_date", baseDate);
  url.searchParams.set("base_time", baseTime);
  url.searchParams.set("nx", nx);
  url.searchParams.set("ny", ny);

  try {
    const response = await fetch(url.toString());
    const text = await response.text();
    
    // JSON이 아닌 경우
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Forecast API non-JSON response:", text.substring(0, 200));
      return NextResponse.json(
        { 
          response: {
            header: { resultCode: "PARSE_ERROR", resultMsg: "Invalid JSON response" },
            body: { items: { item: [] } }
          }
        }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Forecast API Fetch Error:", error);
    return NextResponse.json(
      { 
        response: {
          header: { resultCode: "FETCH_ERROR", resultMsg: String(error) },
          body: { items: { item: [] } }
        }
      }
    );
  }
}
