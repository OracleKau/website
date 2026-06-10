import { NextResponse } from "next/server";
import db from "../../lib/db";
import { verifyAdminSession } from "../../lib/auth";

export async function GET() {
  try {
    const events = await db.event.findMany({
      orderBy: { date: "asc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { title, description, date, location, locationLink, type, rsvpLink } = data;

    if (!title || !date || !location || !type) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const event = await db.event.create({
      data: {
        title,
        description: description || null,
        date: new Date(date),
        location,
        locationLink: locationLink || null,
        type,
        rsvpLink: rsvpLink || null,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { id, title, description, date, location, locationLink, type, rsvpLink } = data;

    if (!id) {
      return NextResponse.json({ error: "Event ID required" }, { status: 400 });
    }

    const event = await db.event.update({
      where: { id },
      data: {
        title,
        description: description !== undefined ? (description || null) : undefined,
        date: date ? new Date(date) : undefined,
        location,
        locationLink: locationLink !== undefined ? (locationLink || null) : undefined,
        type,
        rsvpLink: rsvpLink !== undefined ? (rsvpLink || null) : undefined,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
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
      return NextResponse.json({ error: "Event ID required" }, { status: 400 });
    }

    await db.event.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
