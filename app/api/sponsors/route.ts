import { NextResponse } from "next/server";
import db from "../../lib/db";
import { verifyAdminSession } from "../../lib/auth";

export async function GET() {
  try {
    const sponsors = await db.sponsor.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(sponsors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch sponsors" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { name, tier, logoUrl } = data;

    if (!name || !tier || !logoUrl) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const sponsor = await db.sponsor.create({
      data: {
        name,
        tier,
        logoUrl,
      },
    });

    return NextResponse.json(sponsor);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create sponsor" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { id, name, tier, logoUrl } = data;

    if (!id) {
      return NextResponse.json({ error: "Sponsor ID required" }, { status: 400 });
    }

    const sponsor = await db.sponsor.update({
      where: { id },
      data: {
        name,
        tier,
        logoUrl,
      },
    });

    return NextResponse.json(sponsor);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update sponsor" }, { status: 500 });
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
      return NextResponse.json({ error: "Sponsor ID required" }, { status: 400 });
    }

    await db.sponsor.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete sponsor" }, { status: 500 });
  }
}
