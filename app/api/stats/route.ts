import { NextResponse } from "next/server";
import db from "../../lib/db";

/**
 * GET /api/stats
 * Public endpoint to fetch dynamic statistics from the database
 */
export async function GET() {
  try {
    const memberCount = await db.member.count();
    const projectCount = await db.project.count();

    const depts = await db.member.findMany({
      select: { department: true },
      distinct: ["department"],
    });

    // Filter out presidency/leadership to count actual functional departments
    const departmentCount = depts.filter((d) => d.department !== "presidency").length || 3;

    return NextResponse.json({
      memberCount,
      projectCount,
      departmentCount,
      email: process.env.NOTIFICATION_RECEIVER_EMAIL || "sponsors@oracle-kau.sa",
    });
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}
