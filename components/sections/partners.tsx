const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Netflix",
  "Uber",
  "Spotify",
  "Airbnb",
  "Tesla",
];

export default function Partners() {
  return (
    <div className="bg-[#f6f8ff] relative w-full py-16 md:py-24" data-name="Partners">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[#1d44c3] text-[32px] md:text-[46.3px] leading-[40px] md:leading-[48px] mb-4 md:mb-6">
            Meet Our Partners
          </h2>
          <p className="text-[15px] md:text-[17.4px] leading-[24px] md:leading-[28px] text-gray-800 max-w-[634px] mx-auto px-4">
            Partnering with industry leaders, FinWage provides forward-thinking financial solutions for today's workforce.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 items-center justify-items-center">
          {companies.map((logo) => (
            <div key={logo} className="flex items-center justify-center">
              <img
                src={`https://cdn.magicui.design/companies/${logo}.svg`}
                alt={`${logo} logo`}
                className="h-[40px] w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
