import { getFeaturedPartners } from "@/lib/services/partners";
import { getImageUrl } from "@/lib/utils/pocketbase";
import Image from "next/image";

export default async function Partners() {
  const partners = await getFeaturedPartners(8);

  return (
    <div
      className="bg-[#f6f8ff] relative w-full py-16 md:py-24"
      data-name="Partners"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[#1d44c3] text-[32px] md:text-[46.3px] leading-[40px] md:leading-[48px] mb-4 md:mb-6">
            Meet Our Partners
          </h2>
          <p className="text-[15px] md:text-[17.4px] leading-[24px] md:leading-[28px] text-gray-800 max-w-[634px] mx-auto px-4">
            Partnering with industry leaders, FinWage provides forward-thinking
            financial solutions for today's workforce.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 items-center justify-items-center">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center">
              {partner.logo ? (
                <Image
                  src={getImageUrl(partner, partner.logo, {
                    fallback: "/placeholder.jpg",
                  })}
                  alt={`${partner.name} logo`}
                  width={160}
                  height={80}
                  className="h-[40px] w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <span className="text-lg font-medium text-gray-700">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
