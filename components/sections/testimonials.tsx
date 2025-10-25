import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { getFeaturedTestimonials } from "@/lib/services/testimonials";
import { getImageUrl } from "@/lib/utils/pocketbase";
import type { TestimonialsResponse } from "@/types/pocketbase";

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="size-[16px]">
          <Star 
            className={`block size-full ${
              i < rating 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-gray-300 fill-gray-300"
            }`} 
          />
        </div>
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image: string;
  rating?: number;
}

function TestimonialCard({ quote, name, title, image, rating }: TestimonialCardProps) {
  return (
    <Card className="bg-white rounded-[16px] border border-gray-100 min-w-[280px] w-[280px] md:min-w-[300px] md:w-[300px] flex-shrink-0">
      <CardContent className="p-6 flex flex-col gap-4">
        <StarRating rating={rating} />
        <p className="text-[13.5px] leading-[22.75px] text-gray-700">{quote}</p>
        <div className="flex items-center gap-4">
          <div className="rounded-full shadow-[0px_0px_0px_2px_#ffffff,0px_0px_0px_4px_#1d44c3] size-[40px] overflow-hidden relative">
            <Image 
              src={image} 
              alt={name} 
              fill
              className="object-cover" 
            />
          </div>
          <div>
            <p className="font-bold text-[13.5px] leading-[20px] text-[#1d44c3]">
              {name}
            </p>
            <p className="text-[11.6px] leading-[16px] text-gray-500">
              {title}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MarqueeRowProps {
  testimonials: TestimonialsResponse[];
  reverse?: boolean;
}

function MarqueeRow({ testimonials, reverse = false }: MarqueeRowProps) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{
          animation: reverse
            ? "marquee-reverse 30s linear infinite"
            : "marquee 30s linear infinite",
        }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.id}-${index}`}
            quote={testimonial.quote || ""}
            name={testimonial.name}
            title={`${testimonial.position || ""}${testimonial.company ? ` at ${testimonial.company}` : ""}`}
            image={getImageUrl(testimonial, testimonial.image || "", { fallback: "/assets/person-1.png" })}
            rating={testimonial.rating || 5}
          />
        ))}
      </div>
      <div
        className={`flex gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{
          animation: reverse
            ? "marquee-reverse 30s linear infinite"
            : "marquee 30s linear infinite",
        }}
        aria-hidden="true"
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard
            key={`duplicate-${testimonial.id}-${index}`}
            quote={testimonial.quote || ""}
            name={testimonial.name}
            title={`${testimonial.position || ""}${testimonial.company ? ` at ${testimonial.company}` : ""}`}
            image={getImageUrl(testimonial, testimonial.image || "", { fallback: "/assets/person-1.png" })}
            rating={testimonial.rating || 5}
          />
        ))}
      </div>
    </div>
  );
}

export default async function Testimonials() {
  // Fetch featured testimonials from PocketBase
  const testimonials = await getFeaturedTestimonials(6);

  // If no testimonials are available, don't render the section
  if (testimonials.length === 0) {
    return null;
  }
  return (
    <div
      className="bg-[#f6f8ff] relative w-full py-12 md:py-16 lg:py-24 overflow-hidden"
      data-name="Testimonials"
    >
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <p className="font-bold text-[#f64162] text-[12px] md:text-[13.5px] tracking-[1.4px] uppercase mb-3 md:mb-4">
            Testimonials
          </p>
          <h2 className="text-[#1d44c3] text-[28px] md:text-[38px] lg:text-[46.7px] leading-[1.2] md:leading-[48px] px-4">
            What Our Customers Are Saying
          </h2>
        </div>
      </div>

      <div className="relative">
        {/* Left fade overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-[#f6f8ff] to-transparent z-10 pointer-events-none" />

        {/* Right fade overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-[#f6f8ff] to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-3 md:gap-4">
          <MarqueeRow testimonials={testimonials} />
          <MarqueeRow testimonials={testimonials} reverse />
        </div>
      </div>
    </div>
  );
}
