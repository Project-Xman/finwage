import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FinWage - Earned Wage Access",
    short_name: "FinWage",
    description:
      "Work Today, Get Paid Today! Access your earned wages instantly with FinWage.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1d44c3",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/assets/app-icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/assets/app-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["finance", "business", "productivity"],
    lang: "en-US",
    dir: "ltr",
  };
}
