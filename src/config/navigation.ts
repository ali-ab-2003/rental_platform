/**
 * Navigation configuration.
 *
 * Centralized navigation links used by Navbar, Mobile Nav, and Footer.
 * Separating this prevents hardcoded links scattered across components.
 */

export type NavItem = {
  label: string;
  href: string;
  requiresAuth?: boolean;
};

export const mainNavItems: NavItem[] = [
  { label: "Explore", href: "/" },
  { label: "Messages", href: "/messages", requiresAuth: true },
];

export const authNavItems: NavItem[] = [
  { label: "Sign In", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export const footerNavItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
