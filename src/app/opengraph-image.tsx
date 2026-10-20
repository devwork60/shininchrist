import { ImageResponse } from "next/og";

export const alt = "ShininChrist: Shining Christ in our Hearts, Homes, Communities, and Nations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The picture shown when a ShininChrist link is shared on WhatsApp, Facebook, X and similar. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "linear-gradient(135deg, #0f2a1e 0%, #1d3d2e 60%, #2a5a43 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", width: 120, height: 8, background: "#e8c15a", marginBottom: 36 }} />
        <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -2 }}>ShininChrist</div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#e8c15a", lineHeight: 1.35, maxWidth: 900 }}>
          Shining Christ in our Hearts, Homes, Communities, and Nations.
        </div>
        <div style={{ fontSize: 28, marginTop: 40, color: "#d9d4c0" }}>
          A global ministry, community and nonprofit organization
        </div>
      </div>
    ),
    size,
  );
}
