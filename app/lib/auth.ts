import { cookies } from "next/headers";
import * as jwt from "jsonwebtoken";

/**
 * Checks for a valid admin session by retrieving the JWT from the HTTP-Only cookie,
 * verifying its signature against the secret, and checking its expiry.
 * 
 * @returns Promise<boolean> - True if the session is verified and active, otherwise false.
 */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    // Retrieve cookies store from Next.js request headers
    const cookieStore = await cookies();
    
    // Extract the JWT token from the admin_session cookie
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return false;

    // Retrieve the secret key used to sign the tokens
    const secret = process.env.JWT_SECRET;
    if (!secret) return false;

    // Verify token validity. If signature has been tampered with or token is expired, this will throw an error
    jwt.verify(token, secret);
    return true;

  } catch {
    // Return false on verification errors or missing env configurations
    return false;
  }
}

