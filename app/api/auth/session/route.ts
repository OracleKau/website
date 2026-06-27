import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * GET /api/auth/session
 * Checks if the user is authenticated by verifying their admin_session cookie.
 * Used by the client admin layout to toggle routing guards.
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    // Check if token cookie is present
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json(
        { error: "Server authentication is not configured" },
        { status: 500 }
      );
    }

    try {
      // Decode and verify token signature. Throws if invalid or expired.
      jwt.verify(token, jwtSecret);
      return NextResponse.json({ authenticated: true });
    } catch (err) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

