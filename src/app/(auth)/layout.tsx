import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/motion";
import { Heading, Text } from "@/components/typography";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* LEFT SIDE: Branding / Marketing (Desktop Only) */}
      <div className="relative hidden w-full flex-1 flex-col justify-end lg:flex overflow-hidden bg-black">
        <Image
          src="/images/auth-bg.png"
          alt="Luxury interior"
          fill
          priority
          quality={90}
          className="object-cover opacity-80"
          sizes="(max-width: 1024px) 0vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute inset-0 p-12 flex flex-col justify-between">
          <Link href="/" className="z-10 w-fit">
            <Logo textClassName="text-white" iconClassName="text-white" />
          </Link>

          <FadeIn delay={0.2} className="z-10 max-w-lg mb-12">
            <Heading level="h1" className="text-white mb-4 drop-shadow-md">
              Elevate your stay.
            </Heading>
            <Text variant="lead" className="text-white/80 drop-shadow-sm">
              Join our curated network of extraordinary properties and discerning travelers.
            </Text>
          </FadeIn>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Auth Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[480px] xl:w-[560px] 2xl:w-[640px]">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        
        <main className="mx-auto w-full max-w-sm lg:max-w-md">
          {children}
        </main>
      </div>
    </div>
  );
}
