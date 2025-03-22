/**
 * Homepage with hero section, featured products, and benefits
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import ProductCarousel from "@/components/carousel/product-carousel";

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="font-punk text-4xl md:text-6xl text-foreground">
                <span className="text-primary">SICK</span> THREADS FOR{" "}
                <span className="text-secondary">SICK BEASTS</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Eco-friendly skate clothing with a dark sense of humor. Made on demand, zero waste.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/products">Shop Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/about">Our Story</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-square">
              {/* Placeholder for hero image */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
                <p className="font-punk text-2xl text-foreground">Hero Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-punk text-3xl text-center mb-12">
            <span className="text-primary">FEATURED</span> DESIGNS
          </h2>
          
          <ProductCarousel />
          
          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/products">View All Designs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square">
              {/* Placeholder for sustainability image */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <p className="font-punk text-2xl text-foreground">Eco Image Placeholder</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="font-punk text-3xl">
                <span className="text-secondary">ECO-FRIENDLY</span> BY DESIGN
              </h2>
              <p className="text-lg text-muted-foreground">
                Our t-shirts are produced on demand, which means zero waste and a reduced carbon footprint. 
                We use organic cotton and eco-friendly printing methods to minimize our impact on the planet.
              </p>
              <Button variant="outline" asChild>
                <Link href="/sustainability">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
