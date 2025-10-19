import { Star } from "lucide-react";

function StarRating() {
  return (
    <div className="flex gap-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="size-[16px]">
          <Star className="block size-full text-yellow-400" />
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
}

function TestimonialCard({ quote, name, title, image }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-[16px] p-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] border border-gray-100 min-w-[280px] w-[280px] md:min-w-[300px] md:w-[300px] flex-shrink-0">
      <div className="flex flex-col gap-4">
        <StarRating />
        <p className="text-[13.5px] leading-[22.75px] text-gray-700">
          {quote}
        </p>
        <div className="flex items-center gap-4">
          <div className="rounded-full shadow-[0px_0px_0px_2px_#ffffff,0px_0px_0px_4px_#1d44c3] size-[40px] overflow-hidden">
            <img alt={name} className="size-full object-cover" src={image} />
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
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote: '"The AI-driven analytics from FinWage have revolutionized our product development cycle. Insights are now more accurate and faster than ever. A game-changer for tech companies."',
    name: "Alex Rivera",
    title: "CTO at InnovateTech",
    image: "/assets/person-1.png",
  },
  {
    quote: `"FinWage's AI-driven voice synthesis has made creating global products a breeze. Localization is now seamless and efficient. A must-have for global product teams."`,
    name: "Emily Chen",
    title: "Product Manager at Digital Wave",
    image: "/assets/person-2.png",
  },
  {
    quote: `"By integrating FinWage's sustainable energy solutions, we've seen a significant reduction in carbon footprint. Leading the way in eco-friendly business practices."`,
    name: "Carlos Gomez",
    title: "Head of R&D at EcoInnovate",
    image: "/assets/person-3.png",
  },
  {
    quote: `"FinWage's personalized learning plans have doubled student performance metrics. Education tailored to every learner's needs. Transforming the educational landscape."`,
    name: "Sofia Patel",
    title: "CEO at EduTech Innovations",
    image: "/assets/person-4.png",
  },
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div 
        className={`flex gap-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{
          animation: reverse ? 'marquee-reverse 30s linear infinite' : 'marquee 30s linear infinite'
        }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
            image={testimonial.image}
          />
        ))}
      </div>
      <div 
        className={`flex gap-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{
          animation: reverse ? 'marquee-reverse 30s linear infinite' : 'marquee 30s linear infinite'
        }}
        aria-hidden="true"
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <TestimonialCard
            key={`duplicate-${index}`}
            quote={testimonial.quote}
            name={testimonial.name}
            title={testimonial.title}
            image={testimonial.image}
          />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="bg-[#f6f8ff] relative w-full py-16 md:py-24 overflow-hidden" data-name="Testimonials">
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
        <div className="text-center mb-12 md:mb-16">
          <p className="font-bold text-[#f64162] text-[13.5px] tracking-[1.4px] uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-[#1d44c3] text-[32px] md:text-[46.7px] leading-[48px]">
            What Our Customers Are Saying
          </h2>
        </div>
      </div>
      
      <div className="relative">
        {/* Left fade overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#f6f8ff] to-transparent z-10 pointer-events-none" />
        
        {/* Right fade overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#f6f8ff] to-transparent z-10 pointer-events-none" />
        
        <div className="flex flex-col gap-4">
          <MarqueeRow />
          <MarqueeRow reverse />
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>
      </div>
    </div>
  );
}
