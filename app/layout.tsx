import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "모리의 물방울 | 즐거운 물 마시기",
  description: "아이의 하루 물 마시기를 캐릭터와 스티커로 즐겁게 기록해요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
