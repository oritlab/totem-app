import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const didot = localFont({
  src: "../public/font/Didot Title.otf",
  variable: "--font-didot",
});

export const metadata: Metadata = {
  title: "Catálogo Orit",
  description: "Catálogo de categorias e peças Orit",
  icons: {
    icon: "/orit-simbolo.svg",
  },
};

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${didot.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
