"use client";

/**
 * Contact Form Component
 *
 * Client component for contact form with direct PocketBase API integration.
 * Handles form state, validation errors, and success messages.
 */

import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  EnquiriesInterestOptions,
  EnquiriesStatusOptions,
} from "@/types/pocketbase";

// Direct PocketBase URL for client-side requests (bypasses Next.js server)
const POCKETBASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://pocketbase.finwage.ca";

// ============================================================
// TYPES
// ============================================================

interface FormErrors {
  name?: string[];
  email?: string[];
  message?: string[];
  interest?: string[];
  company?: string[];
  phone?: string[];
  _form?: string[];
}

// ============================================================
// SUBMIT BUTTON COMPONENT
// ============================================================

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button
      type="submit"
      className="w-full bg-[#1d44c3] hover:bg-[#0d2463]"
      size="lg"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Send Message
          <ArrowRight className="w-5 h-5 ml-2" />
        </>
      )}
    </Button>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

interface ContactFormProps {
  defaultInterest?: EnquiriesInterestOptions;
}

export function ContactForm({
  defaultInterest = EnquiriesInterestOptions.contact,
}: ContactFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrors({});
    setSuccess(false);
    setMessage(undefined);

    const formData = new FormData(e.currentTarget);

    try {
      // Extract form data
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const messageText = formData.get("message") as string;
      const interest = formData.get("interest") as EnquiriesInterestOptions;
      const company = formData.get("company") as string;
      const phone = formData.get("phone") as string;

      // Client-side validation
      const newErrors: FormErrors = {};

      if (!name || name.trim().length < 2) {
        newErrors.name = ["Name must be at least 2 characters"];
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = ["Please enter a valid email address"];
      }

      if (!messageText || messageText.trim().length < 10) {
        newErrors.message = ["Message must be at least 10 characters"];
      }

      if (messageText && messageText.length > 1000) {
        newErrors.message = ["Message must not exceed 1000 characters"];
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsPending(false);
        return;
      }

      // Prepare data for PocketBase
      const data = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: messageText.trim(),
        interest: interest || EnquiriesInterestOptions.contact,
        company: company?.trim() || undefined,
        phone: phone ? Number(phone.replace(/[\s\-()]/g, "")) : undefined,
        status: EnquiriesStatusOptions.new,
      };

      // Submit directly to PocketBase (bypasses Next.js server)
      const response = await fetch(
        `${POCKETBASE_URL}/api/collections/enquiries/records`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit enquiry");
      }

      // Success
      setSuccess(true);
      setMessage("Thank you for contacting us! We'll get back to you soon.");
      formRef.current?.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({
        _form: [
          error instanceof Error
            ? error.message
            : "Failed to submit enquiry. Please try again later.",
        ],
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {success && message && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {message}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {!success && errors._form && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors._form.join(", ")}</AlertDescription>
        </Alert>
      )}

      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          required
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-600">
            {errors.name.join(", ")}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-600">
            {errors.email.join(", ")}
          </p>
        )}
      </div>

      {/* Company Field (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="company">Company Name</Label>
        <Input
          id="company"
          name="company"
          type="text"
          placeholder="Acme Corporation"
          aria-invalid={errors.company ? "true" : "false"}
          aria-describedby={errors.company ? "company-error" : undefined}
        />
        {errors.company && (
          <p id="company-error" className="text-sm text-red-600">
            {errors.company.join(", ")}
          </p>
        )}
      </div>

      {/* Phone Field (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          aria-invalid={errors.phone ? "true" : "false"}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="text-sm text-red-600">
            {errors.phone.join(", ")}
          </p>
        )}
      </div>

      {/* Interest Field */}
      <div className="space-y-2">
        <Label htmlFor="interest">
          I'm interested in <span className="text-red-500">*</span>
        </Label>
        <Select name="interest" defaultValue={defaultInterest} required>
          <SelectTrigger id="interest">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={EnquiriesInterestOptions.demo}>
              Scheduling a Demo
            </SelectItem>
            <SelectItem value={EnquiriesInterestOptions.pricing}>
              Pricing Information
            </SelectItem>
            <SelectItem value={EnquiriesInterestOptions.contact}>
              General Inquiry
            </SelectItem>
            <SelectItem value={EnquiriesInterestOptions.other}>
              Other
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.interest && (
          <p id="interest-error" className="text-sm text-red-600">
            {errors.interest.join(", ")}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your needs..."
          rows={5}
          required
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-red-600">
            {errors.message.join(", ")}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <SubmitButton pending={isPending} />

      {/* Privacy Notice */}
      <p className="text-sm text-gray-500 text-center">
        By submitting this form, you agree to our Privacy Policy
      </p>
    </form>
  );
}
