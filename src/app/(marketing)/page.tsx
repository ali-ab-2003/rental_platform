import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Container, 
  Section, 
  Stack, 
  Button, 
  ImageFrame,
  Card 
} from "@/components/primitives";
import { Heading, Text } from "@/components/typography";
import { FadeIn, FadeUp } from "@/components/motion";
import { auth } from "@/lib/auth";

const MOCK_LISTINGS = [
  {
    id: "1",
    title: "The Glass Pavilion",
    location: "Malibu, California",
    price: "$2,400",
    image: "/images/listing-1.png",
  },
  {
    id: "2",
    title: "Nordic Forest Retreat",
    location: "Oslo, Norway",
    price: "$1,850",
    image: "/images/listing-2.png",
  },
  {
    id: "3",
    title: "Brutalist Canyon Oasis",
    location: "Amangiri, Utah",
    price: "$3,100",
    image: "/images/listing-3.png",
  },
];

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="bg-background">
      {/* 1. HERO SECTION */}
      <Section spacing="xl" className="border-b border-border/40 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6">
              <Stack gap={6} align="start" className="max-w-xl">
                <FadeUp>
                  <Heading level="h1" className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]">
                    Extraordinary <br className="hidden md:inline" />
                    stays, curated <br className="hidden md:inline" />
                    for you.
                  </Heading>
                </FadeUp>
                
                <FadeUp delay={0.1}>
                  <Text variant="lead" className="text-muted-foreground text-lg md:text-xl">
                    Discover the world&apos;s most refined luxury rentals. Handpicked architectural masterpieces designed for unforgettable stays.
                  </Text>
                </FadeUp>

                <FadeUp delay={0.2} className="w-full">
                  <div className="flex flex-row items-center gap-4 pt-4">
                    {isLoggedIn ? (
                      <Button size="lg" asChild>
                        <Link href="/messages">Go to Messages</Link>
                      </Button>
                    ) : (
                      <>
                        <Button size="lg" asChild>
                          <Link href="/messages">Explore Homes</Link>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                          <Link href="/login">Sign In</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </FadeUp>
              </Stack>
            </div>

            {/* Right Image Block Column */}
            <div className="lg:col-span-6 w-full h-full">
              <FadeIn delay={0.3}>
                <ImageFrame aspectRatio="landscape" rounded="xl" className="shadow-2xl shadow-black/5 overflow-hidden group">
                  <Image
                    src="/images/home-hero.png"
                    alt="Luxury architectural villa"
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  />
                </ImageFrame>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. FEATURED LISTINGS SECTION */}
      <Section spacing="lg" className="border-b border-border/40 bg-muted/10">
        <Container>
          <Stack gap={12}>
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/40 pb-8">
              <Stack gap={2} className="max-w-2xl">
                <Heading level="h2" className="text-3xl md:text-4xl font-medium tracking-tight">
                  Featured Stays
                </Heading>
                <Text variant="muted" className="text-base text-muted-foreground">
                  Bespoke, private sanctuaries handpicked by our editorial team.
                </Text>
              </Stack>
              <Button variant="ghost" asChild>
                <Link href="/messages">View All Properties</Link>
              </Button>
            </div>

            {/* Grid Layout (3 columns desktop, 1 mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_LISTINGS.map((listing, index) => (
                <FadeUp key={listing.id} delay={index * 0.1}>
                  <Card className="group overflow-hidden bg-transparent shadow-none hover:shadow-none p-0 cursor-pointer">
                    <ImageFrame aspectRatio="portrait" rounded="xl" className="overflow-hidden mb-4 relative aspect-[4/5]">
                      <Image
                        src={listing.image}
                        alt={listing.title}
                        fill
                        quality={85}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                    </ImageFrame>
                    <Stack gap={2} className="px-1">
                      <Heading level="h3" className="text-lg font-semibold tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                        {listing.title}
                      </Heading>
                      <Text variant="muted" className="text-sm">
                        {listing.location}
                      </Text>
                      <div className="flex items-baseline gap-1 mt-1">
                        <Text className="font-semibold text-foreground">{listing.price}</Text>
                        <Text variant="muted" className="text-xs">/ night</Text>
                      </div>
                    </Stack>
                  </Card>
                </FadeUp>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>

      {/* 3. TRUST & LUXURY VALUE SECTION */}
      <Section spacing="lg" className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <Stack gap={4} className="sticky top-24">
                <Heading level="h2" className="text-3xl md:text-4xl font-medium tracking-tight">
                  Why Haven
                </Heading>
                <Text variant="muted" className="text-base max-w-sm">
                  We bridge the gap between luxury hospitality standards and ultra-exclusive residential stays.
                </Text>
              </Stack>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <FadeUp delay={0.1}>
                <Stack gap={4}>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <Heading level="h3" className="text-lg font-semibold tracking-tight text-foreground">
                    Verified Properties
                  </Heading>
                  <Text variant="muted" className="text-sm leading-relaxed">
                    Every residence undergoes a rigorous 200-point inspection to ensure pristine design, cleanliness, and connectivity.
                  </Text>
                </Stack>
              </FadeUp>

              <FadeUp delay={0.2}>
                <Stack gap={4}>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <Heading level="h3" className="text-lg font-semibold tracking-tight text-foreground">
                    Premium Hosts
                  </Heading>
                  <Text variant="muted" className="text-sm leading-relaxed">
                    Our verified hosts adhere to strict hospitality standards, guaranteeing seamless check-ins and bespoke local experiences.
                  </Text>
                </Stack>
              </FadeUp>

              <FadeUp delay={0.3}>
                <Stack gap={4}>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <Heading level="h3" className="text-lg font-semibold tracking-tight text-foreground">
                    Seamless Experience
                  </Heading>
                  <Text variant="muted" className="text-sm leading-relaxed">
                    From digital key access to professional cleaning, we provide a friction-free experience from booking to departure.
                  </Text>
                </Stack>
              </FadeUp>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
