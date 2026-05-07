import React from "react";
import { 
  Container, 
  Section, 
  Stack, 
  Button, 
  ImageFrame 
} from "@/components/primitives";
import { Heading, Text } from "@/components/typography";
import { FadeIn, FadeUp } from "@/components/motion";

export default function Home() {
  return (
    <div>
      <Section spacing="xl" className="overflow-hidden relative bg-muted/30">
        <Container>
          <Stack align="center" gap={8} className="text-center max-w-3xl mx-auto">
            <FadeUp>
              <Heading level="h1">
                Extraordinary stays, <br />
                curated for you.
              </Heading>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Text variant="lead">
                Discover the world's most luxurious rental properties. From
                architectural masterpieces to secluded private islands.
              </Text>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg">Explore Properties</Button>
                <Button variant="outline" size="lg">How It Works</Button>
              </div>
            </FadeUp>
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container>
          <FadeIn>
            <Stack gap={12}>
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-border/40 pb-8">
                <Stack gap={2} className="max-w-2xl">
                  <Heading level="h2">Featured Collections</Heading>
                  <Text variant="muted">Handpicked by our editorial team.</Text>
                </Stack>
                <Button variant="ghost">View All Collections</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Stack key={i} gap={4}>
                    <ImageFrame aspectRatio="portrait" rounded="xl" />
                    <Stack gap={2}>
                      <Heading level="h3">The Minimalist Collection</Heading>
                      <Text variant="muted">12 properties</Text>
                    </Stack>
                  </Stack>
                ))}
              </div>
            </Stack>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
