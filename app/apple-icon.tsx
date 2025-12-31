import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  // Use the FinWage app icon for Apple Touch Icon
  try {
    const iconData = await readFile(
      join(process.cwd(), "public", "assets", "app-icon.png")
    );
    const base64Icon = iconData.toString("base64");

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          borderRadius: "22%",
        }}
      >
        <img
          src={`data:image/png;base64,${base64Icon}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          alt="FinWage"
        />
      </div>,
      { ...size }
    );
  } catch {
    // Fallback to text-based icon
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d44c3 0%, #0d2463 100%)",
          borderRadius: "22%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "100px",
            fontWeight: "bold",
            color: "white",
            letterSpacing: "-4px",
          }}
        >
          F
        </div>
      </div>,
      { ...size }
    );
  }
}
