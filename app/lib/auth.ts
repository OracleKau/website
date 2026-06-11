import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

export async function verifyAdminSession(): Promise<boolean> {
  try {
    // Read the admin session cookie from the request
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return false;

    // Verify the JWT token against the server secret
    const secret = process.env.JWT_SECRET;
    if (!secret) return false;

    jwt.verify(token, secret);
    return true;

  } catch {
    return false;
  }
}
