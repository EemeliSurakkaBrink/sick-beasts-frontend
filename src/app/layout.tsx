import type { Metadata } from "next";
import { Geist, Permanent_Marker } from "next/font/google";
import "./globals.css";

// Main font for body text
const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Punk-inspired font for headers
const punkFont = Permanent_Marker({
  weight: "400",
  variable: '--font-punk',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sick Beasts | Sustainable Skate Clothing",
  description: "Eco-friendly print-on-demand t-shirts with dark humor and tongue-in-cheek designs for skaters and eco-conscious youth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geist.variable} ${punkFont.variable} min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
