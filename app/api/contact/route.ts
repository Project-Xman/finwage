import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createEnquiry } from "@/lib/api";
import { revalidatePath } from "next/cache";
import {
  EnquiriesInterestOptions,
  EnquiriesStatusOptions,
} from "@/types/pocketbase";

// Configure for Cloudflare compatibility
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters")
    .trim(),
  interest: z.nativeEnum(EnquiriesInterestOptions, {
    message: "Please select a valid interest option",
  }),
  company: z
    .string()
    .max(200, "Company name must not exceed 200 characters")
    .trim()
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Convert phone string to number if provided
    const phoneNumber = data.phone
      ? Number(data.phone.replace(/[\s\-()]/g, ""))
      : undefined;

    // Create enquiry in PocketBase
    const enquiry = await createEnquiry({
      name: data.name,
      email: data.email,
      message: data.message,
      interest: data.interest,
      company: data.company,
      phone: phoneNumber,
      status: EnquiriesStatusOptions.new,
    });

    // Revalidate contact page
    revalidatePath("/contact");

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll get back to you soon.",
        data: { id: enquiry.id },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to submit enquiry. Please try again.";

    return NextResponse.json(
      {
        success: false,
        message,
        errors: { _form: [message] },
      },
      { status: 500 }
    );
  }
}
