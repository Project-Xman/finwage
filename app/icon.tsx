import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1d44c3 0%, #0d2463 100%)",
        borderRadius: "20%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "280px",
          fontWeight: "bold",
          color: "white",
          letterSpacing: "-10px",
        }}
      >
        F
      </div>
    </div>,
    { ...size },
  );
}
