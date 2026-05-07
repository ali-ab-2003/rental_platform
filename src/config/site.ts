/**
 * Site-wide configuration.
 *
 * Centralized metadata and branding constants.
 * Used by layouts, SEO metadata, and navigation.
 */
export const siteConfig = {
  name: "Haven",
  description: "Curated luxury rentals for extraordinary stays",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/og.jpg",
  creator: "Haven Team",
  keywords: [
    "luxury rentals",
    "vacation homes",
    "premium stays",
    "curated properties",
  ],
} as const;
