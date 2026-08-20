import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "수아의 물방울",
  description: "수아의 물 마시기 기록",
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
