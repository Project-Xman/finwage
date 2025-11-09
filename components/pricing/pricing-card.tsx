"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { ContactModal } from "@/components/shared/contact-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnquiriesInterestOptions } from "@/types/pocketbase";

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    price: string;
    description: string;
    employees: string;
    features: string[];
    notIncluded: string[];
    recommended: boolean;
  };
}

export function PricingCard({ plan }: PricingCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className={`${plan.recommended ? "ring-4 ring-[#1d44c3] relative md:scale-105" : ""}`}
      >
        {plan.recommended && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-[#1d44c3] text-white">Most Popular</Badge>
          </div>
        )}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          <div className="text-4xl font-bold text-[#1d44c3] my-4">
            {plan.price}
          </div>
          <CardDescription className="text-base">
            {plan.description}
          </CardDescription>
          {plan.employees && (
            <p className="text-sm font-semibold text-foreground mt-2">
              {plan.employees}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            className={`w-full ${
              plan.recommended
                ? "bg-[#1d44c3] hover:bg-[#0d2463]"
                : "border border-[#1d44c3] text-[#1d44c3] hover:bg-[#1d44c3] hover:text-white"
            }`}
          >
            Get Started
          </Button>

          <div className="space-y-4">
            {plan.features.map((feature, idx) => (
              <div
                key={`${plan.id}-feature-${idx}`}
                className="flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
            {plan.notIncluded.map((feature, idx) => (
              <div
                key={`${plan.id}-not-${idx}`}
                className="flex items-start gap-3 opacity-50"
              >
                <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <ContactModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        interestType={EnquiriesInterestOptions.pricing}
        title={`Get Started with ${plan.name}`}
        description={`We'll contact you to help get you started with the ${plan.name} plan.`}
      />
    </>
  );
}
