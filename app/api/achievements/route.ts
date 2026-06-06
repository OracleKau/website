import { NextResponse } from "next/server";
import db from "../../lib/db";
import { verifyAdminSession } from "../../lib/auth";

export async function GET() {
  try {
    const achievements = await db.achievement.findMany({
      orderBy: { year: "desc" },
    });
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { year, title, text, imageUrl } = data;

    if (!year || !title || !text || !imageUrl) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const achievement = await db.achievement.create({
      data: {
        year,
        title,
        text,
        imageUrl,
      },
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { id, year, title, text, imageUrl } = data;

    if (!id) {
      return NextResponse.json({ error: "Achievement ID required" }, { status: 400 });
    }

    const achievement = await db.achievement.update({
      where: { id },
      data: {
        year,
        title,
        text,
        imageUrl,
      },
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update achievement" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Achievement ID required" }, { status: 400 });
    }

    await db.achievement.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete achievement" }, { status: 500 });
  }
}
