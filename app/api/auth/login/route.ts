import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * POST /api/auth/login
 * Validates credentials against environment variables and issues an HTTP-Only secure JWT session cookie.
 */
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Authenticate against admin credentials stored in environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    // Check credentials match
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Sign a JWT token with the admin role, expires in 7 days
    const token = jwt.sign(
      { role: "admin", email },
      jwtSecret!,
      { expiresIn: "7d" }
    );

    // Set the token as an HTTP-Only secure cookie to safeguard against XSS attacks
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("admin_session", token, {
      httpOnly: true, // Prevents client-side JS from reading the cookie
      secure: process.env.NODE_ENV === "production", // Transmit only over HTTPS in production
      sameSite: "strict", // Strict CSRF protection
      path: "/", // Valid for the entire domain
      maxAge: 60 * 60 * 24 * 7, // Expires in 7 days (seconds)
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

