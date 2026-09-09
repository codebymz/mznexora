import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";

import "@/app/globals.css";
import { CursorGlow } from "@/components/fx/cursor-glow";
import { CustomCursor } from "@/components/fx/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { IntroProvider } from "@/components/providers/intro";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Footer } from "@/components/sections/footer";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  icons: {
    icon: site.logo.path,
    shortcut: site.logo.path,
    apple: site.logo.path,
  },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1120",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="bg-abyss text-ice antialiased selection:bg-electric/60 selection:text-ice">
        <IntroProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <CursorGlow />
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </IntroProvider>
      </body>
    </html>
  );
}
