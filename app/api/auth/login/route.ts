import { NextResponse } from "next/server";
// TODO (Teammate Task): Import jwt from "jsonwebtoken" to sign tokens

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // TODO: Credentials Authentication & Secure Cookie Handling
    // 1. Fetch credentials (ADMIN_EMAIL, ADMIN_PASSWORD, and JWT_SECRET) from process.env.
    // 2. Validate email and password match the ones configured in env.
    //    If they don't, return a 401 Unauthorized response:
    //    NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    // 3. If validation passes, sign a JWT token containing { role: "admin" } with JWT_SECRET,
    //    configured to expire in 7 days.
    // 4. Set the signed token as an HTTP-Only secure cookie named "admin_session" on the response.
    //    Configure flags: httpOnly: true, sameSite: "strict", maxAge: 7 days, path: "/",
    //    and secure: true in production.
    // 5. Return success JSON response.

    return NextResponse.json(
      { error: "Login handler is a TODO task for your teammate!" },
      { status: 501 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
