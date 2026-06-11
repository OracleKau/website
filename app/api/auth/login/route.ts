import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Authenticate against admin credentials stored in environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    // 2. Validate email and password match the ones configured in env.
    //    If they don't, return a 401 Unauthorized response:
    //    NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 3. If validation passes, sign a JWT token containing { role: "admin" } with JWT_SECRET,
    //    configured to expire in 7 days.
      const token = jwt.sign(
      { role: "admin", email },
      jwtSecret!,
      { expiresIn: "7d" }
    );
    // 4. Set the signed token as an HTTP-Only secure cookie named "admin_session" on the response.
    //    Configure flags: httpOnly: true, sameSite: "strict", maxAge: 7 days, path: "/",
    //    and secure: true in production.
    const response = NextResponse.json({
      message: "Login successful",
    });
      response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // 5. Return success JSON response.

return response;

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
