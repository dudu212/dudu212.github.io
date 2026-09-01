import { ImageResponse } from "next/og";

export const alt = "dudu.dev — 前端 & AI 工程笔记";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#e9e2d0",
          color: "#2c2620",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* 双线书封边框 */}
        <div style={{ position: "absolute", top: 46, left: 46, right: 46, bottom: 46, border: "1px solid #b6aa8c", display: "flex" }} />
        <div style={{ position: "absolute", top: 53, left: 53, right: 53, bottom: 53, border: "1px solid #b6aa8c", display: "flex" }} />

        <div style={{ display: "flex", fontSize: 38, letterSpacing: 10, color: "#736855" }}>
          FRONTEND × AI
        </div>
        <div style={{ display: "flex", fontSize: 122, fontWeight: 700, marginTop: 10 }}>
          dudu.dev
        </div>
        <div style={{ display: "flex", fontSize: 33, color: "#736855", marginTop: 20 }}>
          notes · projects · retrospectives
        </div>

        {/* 朱砂印 */}
        <div
          style={{
            position: "absolute",
            bottom: 92,
            right: 104,
            width: 82,
            height: 82,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #9c3a2c",
            borderRadius: 8,
            color: "#9c3a2c",
            fontSize: 42,
            fontWeight: 700,
            transform: "rotate(-6deg)",
          }}
        >
          d
        </div>
      </div>
    ),
    { ...size }
  );
}
