"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Inline, Button } from "@/components/primitives";
import { mainNavItems, authNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { useSession, signOut } from "next-auth/react";

import { Logo } from "@/components/ui/logo";

export function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <Inline justify="between" className="h-20">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <Inline gap={8} className="hidden md:flex">
            <nav className="flex items-center space-x-8 text-sm font-medium">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-border/40">
              {isLoggedIn ? (
                <Button onClick={() => signOut()}>
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href={authNavItems[0].href}>{authNavItems[0].label}</Link>
                  </Button>
                  <Button asChild>
                    <Link href={authNavItems[1].href}>{authNavItems[1].label}</Link>
                  </Button>
                </>
              )}
            </div>
          </Inline>

          {/* Mobile menu trigger (placeholder) */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </Inline>
      </Container>
    </header>
  );
}
