import { NextResponse } from "next/server";

import { contactSchema, firstErrors } from "@/lib/schema/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const errors = firstErrors(parsed.error.issues);
      return NextResponse.json(
        { errors, message: "Validation failed." },
        { status: 400 },
      );
    }

    if (parsed.data.trap) {
      // Honeypot caught a bot — silently succeed
      return NextResponse.json(
        { success: true, message: "Brief received successfully." },
        { status: 200 },
      );
    }

    // Log the brief server-side
    console.log("Contact brief received:", {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      service: parsed.data.service,
      budget: parsed.data.budget,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Brief received successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { message: "Server error. Try again, or email us directly." },
      { status: 500 },
    );
  }
}
