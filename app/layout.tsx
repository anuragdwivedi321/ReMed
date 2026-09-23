import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { StoreProvider } from "@/lib/store";
import { LanguageProvider } from "@/lib/languageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import AppSplashScreen from "@/components/AppSplashScreen";

export const metadata: Metadata = {
  title: "ReMeD — For a Safer, Healthier Tomorrow | Check. Track. Stay Safe.",
  description:
    "A smarter way to manage and reuse medicines. Get expiry alerts, scan strips, sell or donate unused unexpired medicines responsibly.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased flex min-h-screen flex-col bg-paper text-ink w-full max-w-full min-w-0 overflow-x-hidden">
        <AuthProvider>
          <StoreProvider>
            <LanguageProvider>
              <Navbar />
              <main className="flex-1 pb-20 lg:pb-0 w-full max-w-full min-w-0 overflow-x-hidden">{children}</main>
              <Footer />
              <MobileBottomNav />
              <AppSplashScreen />
            </LanguageProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
