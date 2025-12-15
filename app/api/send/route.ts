"use server";

import { NextRequest, NextResponse } from "next/server";
import { generateContentCalendar } from "@/app/server/controllers/contentPlannerController";
import { contentCalendarData } from "@/app/server/controllers/types";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle OPTIONS requests (important!)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as contentCalendarData;

    console.log("📥 Received content calendar request:", data);

    // Generate posts + comments using your rewritten planner
    const calendar = generateContentCalendar(data);

    console.log("📤 Generated content calendar:", calendar);

    return NextResponse.json(
      {
        success: true,
        calendar,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error("❌ Error in /api/send:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Unknown server error",
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
