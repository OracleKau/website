import { NextResponse } from "next/server";
import db from "../../lib/db";
import { verifyAdminSession } from "../../lib/auth";

/**
 * GET /api/projects
 * Public endpoint to fetch all portfolio projects, sorted by custom display order index ascending.
 */
export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

/**
 * POST /api/projects
 * Admin-only endpoint to add a new project to the portfolio list.
 */
export async function POST(req: Request) {
  try {
    // Verify admin privileges
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { num, category, status, name, desc, capabilities, technologies, team, github, year, order } = data;

    // Validate payload constraints
    if (!num || !category || !status || !name || !desc || !capabilities || !technologies || !team || !year) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Create new project record
    const project = await db.project.create({
      data: {
        num,
        category,
        status,
        name,
        desc,
        capabilities,
        technologies,
        team,
        github: github || null,
        year,
        order: order !== undefined ? Number(order) : 0,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

/**
 * PUT /api/projects
 * Admin-only endpoint to update an existing project's attributes.
 */
export async function PUT(req: Request) {
  try {
    // Verify admin privileges
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { id, num, category, status, name, desc, capabilities, technologies, team, github, year, order } = data;

    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    // Update target project record
    const project = await db.project.update({
      where: { id },
      data: {
        num,
        category,
        status,
        name,
        desc,
        capabilities,
        technologies,
        team,
        github: github !== undefined ? (github || null) : undefined,
        year,
        order: order !== undefined ? Number(order) : undefined,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

/**
 * DELETE /api/projects?id=...
 * Admin-only endpoint to delete a project from portfolio list.
 */
export async function DELETE(req: Request) {
  try {
    // Verify admin privileges
    if (!(await verifyAdminSession())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    // Delete project from database
    await db.project.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

