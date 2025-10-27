"use client";

/**
 * Contact Form Component
 *
 * Client component for contact form with Server Action integration.
 * Handles form state, validation errors, and success messages.
 */

import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
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
  type ContactFormState,
  submitContactForm,
} from "@/lib/actions/contact";
import { EnquiriesInterestOptions } from "@/types/pocketbase";

// ============================================================
// SUBMIT BUTTON COMPONENT
// ============================================================

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-[#1d44c3] hover:bg-[#0d2463]"
      size="lg"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send Message"}
      {!pending && <ArrowRight className="w-5 h-5 ml-2" />}
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
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    { success: false },
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on successful submission
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {/* Success Message */}
      {state.success && state.message && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {!state.success && state.errors?._form && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{state.errors._form.join(", ")}</AlertDescription>
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
          aria-invalid={state.errors?.name ? "true" : "false"}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
        />
        {state.errors?.name && (
          <p id="name-error" className="text-sm text-red-600">
            {state.errors.name.join(", ")}
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
          aria-invalid={state.errors?.email ? "true" : "false"}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
        />
        {state.errors?.email && (
          <p id="email-error" className="text-sm text-red-600">
            {state.errors.email.join(", ")}
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
          aria-invalid={state.errors?.company ? "true" : "false"}
          aria-describedby={state.errors?.company ? "company-error" : undefined}
        />
        {state.errors?.company && (
          <p id="company-error" className="text-sm text-red-600">
            {state.errors.company.join(", ")}
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
          aria-invalid={state.errors?.phone ? "true" : "false"}
          aria-describedby={state.errors?.phone ? "phone-error" : undefined}
        />
        {state.errors?.phone && (
          <p id="phone-error" className="text-sm text-red-600">
            {state.errors.phone.join(", ")}
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
        {state.errors?.interest && (
          <p id="interest-error" className="text-sm text-red-600">
            {state.errors.interest.join(", ")}
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
          aria-invalid={state.errors?.message ? "true" : "false"}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message && (
          <p id="message-error" className="text-sm text-red-600">
            {state.errors.message.join(", ")}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <SubmitButton />

      {/* Privacy Notice */}
      <p className="text-sm text-gray-500 text-center">
        By submitting this form, you agree to our Privacy Policy
      </p>
    </form>
  );
}
