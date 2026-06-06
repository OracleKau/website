import { cookies } from "next/headers";
// TODO: Import jwt from "jsonwebtoken" to verify sessions
import * as jwt from "jsonwebtoken";

export async function verifyAdminSession(): Promise<boolean> {
  try {
    // TODO: Secure Session Verification logic
    // 1. Access cookies using cookies() utility from next/headers.
  const cookieStore = await cookies();

    // 2. Retrieve the "admin_session" cookie value. If missing, return false.
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return false;

    // 3. Fetch JWT_SECRET from environment variables.
    const secret = process.env.JWT_SECRET;

    if (!secret) return false;

    // 4. Verify the session token using jwt.verify(token, secret).
      jwt.verify(token, secret);

    // 5. If verification succeeds, return true. Otherwise return false.
    return true;

  } catch {
    return false;
  }
}
