import Image from "next/image";
import { getFeaturedIntegrations } from "@/lib/services/integrations";
import { getImageUrl } from "@/lib/utils/pocketbase";
import IntegrationDemo from "./integrations-demo";

export default async function Integrations() {
  const integrations = await getFeaturedIntegrations(8);

  return (
    <section className="bg-white w-full py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-4 mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#1d44c3] leading-tight">
            Seamless Integrations
          </h2>
          <p className="text-base md:text-lg text-gray-800 leading-7 max-w-2xl mx-auto">
            Connect FinWage with your existing tools and platforms for a unified
            payroll experience.
          </p>
        </div>

        {integrations.length > 0 ? (
          <IntegrationDemo integrations={integrations} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {integration.logo ? (
                  <Image
                    src={getImageUrl(integration, integration.logo, {
                      fallback: "/placeholder.jpg",
                    })}
                    alt={integration.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-700">
                    {integration.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
