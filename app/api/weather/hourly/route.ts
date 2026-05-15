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
  
  // 초단기예보는 매시 30분 생성
  let baseDate = new Date(now);
  let baseHour = now.getHours();
  
  // 30분 이전이면 한 시간 전 데이터 요청
  if (now.getMinutes() < 30) {
    baseHour -= 1;
    if (baseHour < 0) {
      baseHour = 23;
      baseDate.setDate(baseDate.getDate() - 1);
    }
  }
  
  const year = baseDate.getFullYear();
  const month = String(baseDate.getMonth() + 1).padStart(2, "0");
  const day = String(baseDate.getDate()).padStart(2, "0");
  const hours = String(baseHour).padStart(2, "0");

  const baseDateStr = `${year}${month}${day}`;
  const baseTime = `${hours}30`;

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || "";
  
  const url = new URL(
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"
  );
  url.searchParams.set("serviceKey", decodeURIComponent(apiKey));
  url.searchParams.set("pageNo", "1");
  url.searchParams.set("numOfRows", "100");
  url.searchParams.set("dataType", "JSON");
  url.searchParams.set("base_date", baseDateStr);
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
      console.error("Hourly API non-JSON response:", text.substring(0, 200));
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
    console.error("Hourly API Fetch Error:", error);
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
