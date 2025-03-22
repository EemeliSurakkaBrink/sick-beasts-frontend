/**
 * Sustainability page explaining eco-friendly practices
 */
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";
import Link from "next/link";

export default function SustainabilityPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="font-punk text-3xl md:text-4xl text-center mb-8">
          <span className="text-secondary">SUSTAINABILITY</span>
        </h1>

        {/* Intro */}
        <section className="my-16 max-w-3xl mx-auto text-center">
          <p className="text-xl text-muted-foreground">
            At Sick Beasts, sustainability isn&apos;t just a buzzword—it&apos;s the foundation of everything we do. 
            Our approach to fashion minimizes waste and reduces environmental impact without sacrificing style or quality.
          </p>
        </section>

        {/* Print on Demand */}
        <section className="my-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-punk text-2xl">
                <span className="text-primary">PRINT-ON-DEMAND</span> MODEL
              </h2>
              <p className="text-lg text-muted-foreground">
                Traditional fashion produces massive amounts of waste through overproduction. 
                We do things differently by only printing t-shirts when they&apos;re ordered.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Zero inventory waste</li>
                <li>No unsold items ending up in landfills</li>
                <li>Reduced storage and transportation emissions</li>
                <li>Water conservation through targeted production</li>
              </ul>
            </div>
            <div className="relative aspect-square">
              {/* Placeholder for image */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <p className="font-punk text-2xl text-foreground">Print-on-Demand Image</p>
              </div>
            </div>
          </div>
        </section>

        {/* Materials */}
        <section className="my-16 bg-card p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative aspect-square">
              {/* Placeholder for image */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <p className="font-punk text-2xl text-foreground">Organic Materials Image</p>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="font-punk text-2xl">
                <span className="text-accent">SUSTAINABLE</span> MATERIALS
              </h2>
              <p className="text-lg text-muted-foreground">
                Our t-shirts are made from 100% organic cotton, grown without harmful chemicals or pesticides. 
                We use water-based, eco-friendly inks that are both vibrant and gentle on the environment.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>GOTS-certified organic cotton</li>
                <li>Non-toxic, water-based inks</li>
                <li>Plastic-free packaging</li>
                <li>Biodegradable mailers</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Carbon Neutral */}
        <section className="my-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-punk text-2xl">
                <span className="text-secondary">CARBON</span> NEUTRALITY
              </h2>
              <p className="text-lg text-muted-foreground">
                We offset the carbon emissions from our production and shipping through investments in 
                verified environmental projects around the world.
              </p>
              <p className="text-lg text-muted-foreground">
                Every purchase you make includes a contribution to these carbon offset initiatives, 
                making your Sick Beasts t-shirt carbon neutral from production to delivery.
              </p>
            </div>
            <div className="relative aspect-square">
              {/* Placeholder for image */}
              <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <p className="font-punk text-2xl text-foreground">Carbon Neutral Image</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="my-16 text-center">
          <h2 className="font-punk text-2xl mb-6">WEAR THE CHANGE</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Every Sick Beasts t-shirt you wear is a statement about the kind of world you want to live in. 
            Shop our collection and join the movement for sustainable fashion.
          </p>
          <Button asChild size="lg">
            <Link href="/products">Shop Sustainable</Link>
          </Button>
        </section>
      </div>
    </MainLayout>
  );
} 