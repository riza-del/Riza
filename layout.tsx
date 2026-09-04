import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Khusna Ghoyriza — Portfolio",
  description: "Personal portfolio of Muhammad Khusna Ghoyriza",
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
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
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className="font-sans bg-[#0a0e14] text-white antialiased selection:bg-indigo-500/30 selection:text-white overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}