import { NextResponse } from "next/server";

/**
 * POST /api/auth/logout
 * Clears the admin session cookie by setting its value to empty and expiring it immediately.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear admin session cookie by setting an expired date (Epoch 0)
  response.cookies.set({
    name: "admin_session",
    value: "",
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}

