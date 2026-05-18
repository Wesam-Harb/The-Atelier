import type { Metadata } from "next";
import { Providers } from "@/components/localProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Atelier — Project Studio for Modern Teams",
  description:
    "The Atelier is a beautifully simple project studio. Plan projects, manage tasks and stay on top of your calendar — all in one place",
  openGraph: {
    title: "The Atelier — Project Studio",
    description:
      "Plan projects, manage tasks and stay on top of your calendar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-50" suppressHydrationWarning>
        <SessionProvider>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
