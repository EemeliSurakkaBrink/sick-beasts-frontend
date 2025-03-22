/**
 * Custom 404 page shown when route is not found
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/main-layout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center">
        <h1 className="font-punk text-5xl md:text-6xl mb-6">
          <span className="text-primary">404</span> - Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mb-8">
          Sorry, the page you&apos;re looking for has skated away. It might have been moved, deleted, or never existed.
        </p>
        
        <div className="w-full max-w-md h-64 border-2 border-primary rounded-lg flex items-center justify-center mb-8">
          <div className="font-punk text-xl text-primary">
            404 Image Placeholder
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/">Go Back Home</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/products">Shop T-Shirts</Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
} 