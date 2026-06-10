import { NextResponse } from "next/server";
import db from "../../lib/db";
import { verifyAdminSession } from "../../lib/auth";

export async function GET() {
  try {
    const members = await db.member.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(members);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { name, role, department, initials, quote, imageUrl, linkedin, github, twitter, email, order, isLeadership } = data;

    if (!name || !role || !department || !initials) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const member = await db.member.create({
      data: {
        name,
        role,
        department,
        initials,
        quote: quote || null,
        imageUrl: imageUrl || null,
        linkedin: linkedin || null,
        github: github || null,
        twitter: twitter || null,
        email: email || null,
        order: order !== undefined ? Number(order) : 10,
        isLeadership: !!isLeadership,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { id, name, role, department, initials, quote, imageUrl, linkedin, github, twitter, email, order, isLeadership } = data;

    if (!id) {
      return NextResponse.json({ error: "Member ID required" }, { status: 400 });
    }

    const member = await db.member.update({
      where: { id },
      data: {
        name,
        role,
        department,
        initials,
        quote: quote !== undefined ? (quote || null) : undefined,
        imageUrl: imageUrl !== undefined ? (imageUrl || null) : undefined,
        linkedin: linkedin !== undefined ? (linkedin || null) : undefined,
        github: github !== undefined ? (github || null) : undefined,
        twitter: twitter !== undefined ? (twitter || null) : undefined,
        email: email !== undefined ? (email || null) : undefined,
        order: order !== undefined ? Number(order) : undefined,
        isLeadership: isLeadership !== undefined ? !!isLeadership : undefined,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
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
      return NextResponse.json({ error: "Member ID required" }, { status: 400 });
    }

    await db.member.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
