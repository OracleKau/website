import { NextResponse } from "next/server";
import db from "../../lib/db";
import { verifyAdminSession } from "../../lib/auth";

/**
 * GET /api/contacts
 * Admin-only endpoint to retrieve all partnership and contact submission requests, sorted by date descending.
 */
export async function GET() {
  try {
    // Validate admin credentials
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contacts = await db.contactSubmission.findMany({
      orderBy: { submittedAt: "desc" },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

/**
 * PUT /api/contacts
 * Admin-only endpoint to update the status (e.g. "New", "Contacted", "Completed") of a contact submission lead.
 */
export async function PUT(req: Request) {
  try {
    // Validate admin credentials
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { id, status } = data;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    // Update target submission record
    const submission = await db.contactSubmission.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(submission);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

/**
 * DELETE /api/contacts?id=...
 * Admin-only endpoint to remove a contact submission record from database.
 */
export async function DELETE(req: Request) {
  try {
    // Validate admin credentials
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Submission ID required" }, { status: 400 });
    }

    // Delete submission record
    await db.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}

