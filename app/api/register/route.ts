import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "data" });
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  console.log(res);
  
  return NextResponse.json({ data: res });
}
