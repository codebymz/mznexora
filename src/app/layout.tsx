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
    default: `${site.name} — AI Studio, Autonomous Agents & n8n Automations`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "MZ Nexora",
    "AI Studio",
    "AI Agency",
    "Autonomous AI Agents",
    "n8n Workflow Automation",
    "AI Automation Agency",
    "Next.js AI Developer",
    "Custom AI Chatbots",
    "AI Engineer Pakistan",
    "SaaS Development Studio",
    "Python AI Engineer",
    "PaperGenAI",
    "Speed Lab",
    "Zapr File Converter",
    "API Integration Specialist",
    "Muhammad Zain",
    "Freelance AI Developer",
    "Workflow Automation Agency",
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
    icon: site.logo.path,
    shortcut: site.logo.path,
    apple: site.logo.path,
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
    title: `${site.name} — AI Studio, Autonomous Agents & n8n Automations`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [
      {
        url: `${site.url}/assets/logos/logo.jpg`,
        width: 1200,
        height: 630,
        alt: `${site.name} — AI Studio & Autonomous Agents`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI Studio & Autonomous Agents`,
    description: site.description,
    images: [`${site.url}/assets/logos/logo.jpg`],
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
