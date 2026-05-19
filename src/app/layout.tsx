import type { Metadata } from "next";

import "./globals.css";
import { geistMono, geistSans } from "@/fonts/fonts";

export const metadata: Metadata = {
  title: "AI Interview Question Generator",
  description:
    "Generate tailored interview questions based on job title, seniority level, and category using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
    >
      <body className=" bg-white font-sans">{children}</body>
    </html>
  );
}
