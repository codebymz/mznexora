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
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Full-Stack Software Engineer & AI Systems`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "MZ Nexora",
    "Muhammad Zain",
    "Full-Stack Software Engineer",
    "Next.js Developer",
    "SaaS Engineer",
    "TypeScript React Developer",
    "AI Agent Engineer",
    "OpenAI Agent SDK",
    "n8n Workflow Automation",
    "PaperGenAI",
    "Speed Lab",
    "Zapr File Converter",
    "Software Studio Pakistan",
  ],
  authors: [{ name: "Muhammad Zain", url: site.url }],
  creator: "Muhammad Zain",
  publisher: site.name,
  category: "Technology & Artificial Intelligence",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: site.url,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/assets/logos/logo.svg", type: "image/svg+xml" },
      { url: "/assets/logos/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: `${site.name} — Full-Stack Software Engineer & AI Systems`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: `${site.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} — Software Engineer & Builder`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Full-Stack Software Engineer & AI Systems`,
    description: site.description,
    images: [`${site.url}/og-image.png`],
    creator: "@mznexora",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1120",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    image: `${site.url}/assets/logos/logo.jpg`,
    "@id": site.url,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    sameAs: [
      site.whatsapp,
      site.linkedin,
      site.github,
      "https://facebook.com/mznexora",
      "https://instagram.com/mznexora",
      "https://x.com/mznexora",
    ],
    founder: {
      "@type": "Person",
      name: "Muhammad Zain",
      jobTitle: "Founder & Lead AI Engineer",
    },
    description: site.description,
    knowsAbout: [
      "Artificial Intelligence",
      "Autonomous Agents",
      "n8n Workflow Automation",
      "Next.js Development",
      "Python AI Development",
      "API Integrations",
      "SaaS Architecture",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
