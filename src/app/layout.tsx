import type { Metadata } from "next";
import { Dancing_Script, Geist, Playfair_Display } from "next/font/google";
import Navbar from "@/components/pages/navbar/Navbar";
import { siteUrl } from "@/lib/site-origin";
import { getNavItems } from "@/lib/site-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const DESCRIPTION =
  "A global ministry, community and compassionate nonprofit organization, advancing the gospel of Jesus Christ through spiritual, educational and cultural literacy.";

export const metadata: Metadata = {
  // Makes every relative link below (share image, canonical) a full address.
  metadataBase: new URL(siteUrl()),
  title: "ShininChrist",
  description: DESCRIPTION,
  // Each page's own title and description are used for sharing; the picture comes from opengraph-image.tsx.
  openGraph: { siteName: "ShininChrist", type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

/** Tells search engines who the organization is (shown in some search results). */
const ORGANIZATION_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ShininChrist",
  url: siteUrl(),
  logo: `${siteUrl()}/images/logo.png`,
  description: DESCRIPTION,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // The menu labels and links are admin-editable; the design (icons, descriptions) is kept.
  const navItems = await getNavItems();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${playfair.variable} ${dancing.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_DATA) }}
        />
        <Navbar items={navItems} />
        {children}
      </body>
    </html>
  );
}
