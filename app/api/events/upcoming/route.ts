import { NextResponse } from "next/server";
import db from "../../../lib/db";

export async function GET() {
  try {
    // Keep showing the event up to 3 hours after it starts, so people can still find the room/details during the event
    const cutoffTime = new Date(Date.now() - 3 * 60 * 60 * 1000);

    const upcomingEvent = await db.event.findFirst({
      where: {
        date: {
          gte: cutoffTime,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return NextResponse.json(upcomingEvent);
  } catch (error) {
    console.error("Failed to fetch upcoming event:", error);
    return NextResponse.json({ error: "Failed to fetch upcoming event" }, { status: 500 });
  }
}
