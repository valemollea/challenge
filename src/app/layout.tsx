import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";

import { Providers } from "./_components";
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
  title: "Challenge",
  description: "Frontend senior challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg`}
      >
        <Providers>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <main className="flex flex-col gap-8  justify-items-center min-h-screen p-16 pb-20 w-full">
              {children}
            </main>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
