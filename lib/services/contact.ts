/**
 * Contact Service Layer
 *
 * Provides data fetching and mutation functions for contact-related content.
 * Handles contact options display and enquiry form submissions.
 */

import {
  createEnquiry as apiCreateEnquiry,
  getContactOptions as apiFetchContactOptions,
} from "@/lib/api";
import type {
  ContactOptionsResponse,
  EnquiriesResponse,
} from "@/types/pocketbase";
import {
  EnquiriesInterestOptions,
  EnquiriesStatusOptions,
} from "@/types/pocketbase";

// ============================================================
// TYPES
// ============================================================

export interface ContactOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
  action_url: string;
  addressed: boolean;
}

export interface EnquiryData {
  name: string;
  email: string;
  message: string;
  interest?: EnquiriesInterestOptions;
  company?: string;
  phone?: number;
}

export interface EnquiryResult {
  success: boolean;
  data?: EnquiriesResponse;
  error?: string;
}

// ============================================================
// SERVICE FUNCTIONS
// ============================================================

/**
 * Fetch all contact options for display on contact page
 *
 * Returns various ways users can contact the company (email, phone, chat, etc.)
 *
 * @returns Array of contact options sorted by featured status
 *
 * @example
 * ```ts
 * const contactOptions = await getContactOptions();
 * contactOptions.forEach(option => {
 *   console.log(option.title, option.description);
 * });
 * ```
 */
export async function getContactOptions(): Promise<ContactOptionsResponse[]> {
  try {
    const response = await apiFetchContactOptions({
      sort: "-is_featured",
    });

    return response.items;
  } catch (error) {
    console.error("Failed to fetch contact options:", error);
    return [];
  }
}

/**
 * Create a new enquiry from contact form submission
 *
 * Validates and submits contact form data to PocketBase.
 * This function should be called from Server Actions for security.
 * Optimized for Cloudflare with timeout handling.
 *
 * @param data - Enquiry data from contact form
 * @returns Result object with success status and data or error
 *
 * @example
 * ```ts
 * // In a Server Action
 * const result = await createEnquiry({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   message: 'I would like to learn more about your services',
 *   interest: 'demo',
 *   company: 'Acme Corp'
 * });
 *
 * if (result.success) {
 *   console.log('Enquiry created:', result.data?.id);
 * } else {
 *   console.error('Error:', result.error);
 * }
 * ```
 */
export async function createEnquiry(data: EnquiryData): Promise<EnquiryResult> {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        error: "Name, email, and message are required fields",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: "Invalid email format",
      };
    }

    // Validate message length
    if (data.message.length < 10) {
      return {
        success: false,
        error: "Message must be at least 10 characters long",
      };
    }

    if (data.message.length > 1000) {
      return {
        success: false,
        error: "Message must not exceed 1000 characters",
      };
    }

    // Create enquiry in PocketBase with timeout handling
    const enquiry = await apiCreateEnquiry({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      message: data.message.trim(),
      interest: data.interest || EnquiriesInterestOptions.contact,
      company: data.company?.trim(),
      phone: data.phone,
      status: EnquiriesStatusOptions.new,
    });

    return {
      success: true,
      data: enquiry,
    };
  } catch (error) {
    console.error("Failed to create enquiry:", error);

    // Extract error message if available
    let errorMessage = "Failed to submit enquiry. Please try again later.";
    
    if (error instanceof Error) {
      // Handle timeout errors specifically
      if (error.message.includes("timeout") || error.message.includes("408")) {
        errorMessage = "Request timed out. Please try again.";
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
