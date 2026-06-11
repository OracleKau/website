import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, org, email, kind, message, cfToken } = await req.json();

    // 1. Validate that required fields (name, email) are present.
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // 2. TODO: Verify Turnstile Spam Protection token
    // - Retrieve TURNSTILE_SECRET_KEY from environment variables (process.env.TURNSTILE_SECRET_KEY).
      const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

    // - Retrieve cfToken sent from frontend. If missing, return a 400 Bad Request error.
        if (!cfToken) {
      return NextResponse.json(
        { error: "Missing Turnstile token" },
        { status: 400 }
      );
    }
       if (!turnstileSecret) {
      return NextResponse.json(
        { error: "Server misconfigured (Turnstile secret missing)" },
        { status: 500 }
      );
    }
    // - Make a POST request to "https://challenges.cloudflare.com/turnstile/v0/siteverify" passing
    //   `secret` and `response` (token) as application/x-www-form-urlencoded.
    const formData = new URLSearchParams();
    formData.append("secret", turnstileSecret);
    formData.append("response", cfToken);

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    // - Parse JSON response. If validation fails (!verifyResult.success), return a 400 Bad Request
    //   error saying "Spam check failed, please solve the challenge again."

        const verifyResult = await verifyRes.json();
    if (!verifyResult.success) {
      return NextResponse.json(
        { error: "Spam check failed, please solve the challenge again." },
        { status: 400 }
      );
    }

    // 3. Save the contact form submission to the SQLite database
    const submission = await db.contactSubmission.create({
      data: {
        name: name.trim(),
        org: org?.trim() || null,
        email: email.trim(),
        kind: kind || "other",
        message: message?.trim() || null,
        status: "New",
      },
    });

    // 4. Send a notification email to the club leadership using the Resend SDK.
    const resendApiKey = process.env.RESEND_API_KEY;
    const notificationEmail = process.env.NOTIFICATION_RECEIVER_EMAIL;

    if (resendApiKey && notificationEmail) {
      // Don't try to send using placeholder keys
      if (resendApiKey.startsWith("re_") && resendApiKey.length < 15) {
        console.warn("Resend API key is a placeholder, skipping email dispatch.");
      } else {
        const resend = new Resend(resendApiKey);

        const emailHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #ffffff; color: #333333;">
            <h2 style="color: #ff3d3d; border-bottom: 2px solid #ff3d3d; padding-bottom: 10px; margin-top: 0;">New Partnership Request</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Organisation:</td>
                <td style="padding: 8px 0;">${org || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #ff3d3d; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Partnership Type:</td>
                <td style="padding: 8px 0; text-transform: capitalize;">${kind || "Other"}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 4px; border-left: 4px solid #ff3d3d;">
              <p style="margin: 0; font-weight: bold; font-size: 13px; color: #666;">Message:</p>
              <p style="margin: 10px 0 0 0; line-height: 1.6; white-space: pre-wrap;">${message || "No message provided."}</p>
            </div>
            <p style="font-size: 11px; color: #999; margin-top: 25px; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">
              Submitted via Oracle Club Website Partner Portal.
            </p>
          </div>
        `;

        try {
          await resend.emails.send({
            from: "Oracle Club <onboarding@resend.dev>",
            to: notificationEmail,
            subject: `New Partnership Request: ${name} (${org || "No Org"})`,
            html: emailHtml,
          });
        } catch (err) {
          console.error("Resend email delivery error:", err);
          // Don't fail the response since DB save was successful
        }
      }
    }

    return NextResponse.json({ success: true, submissionId: submission.id });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
