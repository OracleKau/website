import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/app/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join, extname } from "path";

/**
 * POST /api/upload
 * Admin-only endpoint to upload image assets.
 * Saves files locally to 'public/uploads' directory with randomized suffixes to avoid collisions.
 */
export async function POST(req: Request) {
  try {
    // 1. Verify the admin session. Only authenticated admins should be allowed to upload files.
    const isAdmin = await verifyAdminSession();
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse the incoming FormData and retrieve the file object.
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Save the file locally.
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a folder at 'public/uploads' if it doesn't exist.
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // Generate a safe, unique filename to avoid filename collisions.
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = extname(file.name);
    const cleanFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(fileExt, "");
    const filename = `${cleanFileName}-${uniqueSuffix}${fileExt}`;
    const filePath = join(uploadDir, filename);

    // Write the file buffer to the filesystem.
    await writeFile(filePath, buffer);

    // 4. Return the relative asset URL (e.g., `/uploads/filename.png`) in the JSON response.
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url, message: "Upload successful" });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}


