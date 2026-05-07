import React from "react";
import Link from "next/link";
import { Container, Inline, Stack } from "@/components/primitives";
import { Text } from "@/components/typography";
import { footerNavItems } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 md:py-16">
      <Container>
        <Stack gap={8}>
          <Inline justify="between" className="flex-col md:flex-row items-start md:items-center">
            <span className="font-heading text-xl font-medium tracking-tight mb-4 md:mb-0">
              {siteConfig.name}
            </span>
            <nav className="flex flex-wrap gap-6 text-sm">
              {footerNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </Inline>
          
          <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <Text variant="muted">
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </Text>
            <Text variant="micro">
              Curated luxury rentals
            </Text>
          </div>
        </Stack>
      </Container>
    </footer>
  );
}
