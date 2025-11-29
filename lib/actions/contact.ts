"use server";

/**
 * Contact Form Server Actions
 *
 * Handles form submissions for contact enquiries using Next.js Server Actions.
 * Provides validation, error handling, and cache revalidation.
 * Optimized for Cloudflare with 30-second timeout handling.
 */

import { z } from "zod";
import { createEnquiry } from "@/lib/services/contact";
import { revalidateSinglePath } from "@/lib/utils/revalidation";
import { EnquiriesInterestOptions } from "@/types/pocketbase";

// ============================================================
// VALIDATION SCHEMA
// ============================================================

const contactFormSchema = z.object({
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

// ============================================================
// TYPES
// ============================================================

export type ContactFormState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    interest?: string[];
    company?: string[];
    phone?: string[];
    _form?: string[];
  };
};

// ============================================================
// SERVER ACTIONS
// ============================================================

/**
 * Submit contact form enquiry
 *
 * Server Action for handling contact form submissions.
 * Validates input, creates enquiry in PocketBase, and revalidates cache.
 *
 * @param prevState - Previous form state (for useFormState)
 * @param formData - Form data from submission
 * @returns Form state with success status and messages
 *
 * @example
 * ```tsx
 * 'use client';
 * import { useFormState } from 'react-dom';
 * import { submitContactForm } from '@/lib/actions/contact';
 *
 * export function ContactForm() {
 *   const [state, formAction] = useFormState(submitContactForm, { success: false });
 *
 *   return (
 *     <form action={formAction}>
 *       {state.message && <p>{state.message}</p>}
 *       // ... form fields
 *     </form>
 *   );
 * }
 * ```
 */
export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    // Extract form data
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      interest: formData.get("interest"),
      company: formData.get("company"),
      phone: formData.get("phone"),
    };

    // Validate form data
    const validationResult = contactFormSchema.safeParse(rawData);

    if (!validationResult.success) {
      // Return validation errors
      return {
        success: false,
        message: "Please correct the errors below",
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const validatedData = validationResult.data;

    // Convert phone string to number if provided
    const phoneNumber = validatedData.phone
      ? Number(validatedData.phone.replace(/[\s\-()]/g, ""))
      : undefined;

    // Create enquiry using service layer
    const result = await createEnquiry({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      interest: validatedData.interest,
      company: validatedData.company,
      phone: phoneNumber,
    });

    // Handle service layer errors
    if (!result.success) {
      return {
        success: false,
        message: result.error || "Failed to submit enquiry",
        errors: {
          _form: [result.error || "An unexpected error occurred"],
        },
      };
    }

    // Revalidate contact page cache
    await revalidateSinglePath("/contact");

    // Return success state
    return {
      success: true,
      message: "Thank you for contacting us! We'll get back to you soon.",
    };
  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error in submitContactForm:", error);

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      errors: {
        _form: ["Failed to process your request. Please try again."],
      },
    };
  }
}
