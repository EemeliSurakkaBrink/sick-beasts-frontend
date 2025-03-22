/**
 * About Us page with company story and mission
 */
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import Link from "next/link";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-punk text-3xl md:text-4xl text-center mb-8">
          <span className="text-primary">ABOUT</span> US
        </h1>

        {/* Brand Story */}
        <section className="my-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <h2 className="font-punk text-2xl">
                <span className="text-primary">OUR</span> STORY
              </h2>
              <p className="text-lg text-muted-foreground">
                Sick Beasts was born from the collision of skate culture and environmental activism. 
                We&apos;re a group of skaters who got tired of the fashion industry&apos;s wasteful practices 
                and decided to create something different.
              </p>
              <p className="text-lg text-muted-foreground">
                Started in a small garage in 2021, we set out to create clothing that doesn&apos;t just 
                look good but does good. Our tongue-in-cheek designs tackle serious environmental 
                issues with the dark humor that&apos;s central to skate culture.
              </p>
            </div>
            <div className="order-1 md:order-2 relative aspect-square">
              {/* Placeholder for about image */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <p className="font-punk text-2xl text-foreground">Team Image</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="my-16 bg-card p-8 rounded-lg">
          <h2 className="font-punk text-2xl text-center mb-8">
            <span className="text-secondary">OUR</span> MISSION
          </h2>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            To create sustainable, print-on-demand clothing that challenges the status quo, makes people think, and reduces waste in the fashion industry.
          </p>
        </section>

        {/* Values */}
        <section className="my-16">
          <h2 className="font-punk text-2xl text-center mb-12">
            <span className="text-accent">OUR</span> VALUES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <h3 className="font-punk text-xl mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                Every decision we make puts the planet first. From our print-on-demand model to our organic materials, 
                we&apos;re building a brand that leaves minimal impact on the environment.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="font-punk text-xl mb-4">Authenticity</h3>
              <p className="text-muted-foreground">
                We stay true to our skate roots and don&apos;t water down our message. Our designs are bold, 
                provocative, and always authentic to our vision.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="font-punk text-xl mb-4">Community</h3>
              <p className="text-muted-foreground">
                We&apos;re building more than a brand—we&apos;re creating a community of like-minded people who care about 
                the planet and aren&apos;t afraid to make some noise about it.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="my-16 text-center">
          <h2 className="font-punk text-2xl mb-6">JOIN THE MOVEMENT</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Want to wear your values? Check out our latest designs and join the growing community of Sick Beasts.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
        </section>
      </div>
    </MainLayout>
  );
} 