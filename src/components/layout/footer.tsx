/**
 * Site footer with links, newsletter signup and social media
 */
import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h2 className="font-punk text-xl text-primary">SICK BEASTS</h2>
            <p className="text-sm text-muted-foreground">
              Sustainable, eco-friendly print-on-demand t-shirts with a dark sense of humor.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-punk text-sm font-medium uppercase text-foreground">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
                  All T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-sm text-muted-foreground hover:text-primary">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/bestsellers" className="text-sm text-muted-foreground hover:text-primary">
                  Best Sellers
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-punk text-sm font-medium uppercase text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-sm text-muted-foreground hover:text-primary">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-punk text-sm font-medium uppercase text-foreground">Stay Updated</h3>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
                required
              />
              <Button type="submit" variant="default" className="w-full">
                Subscribe
              </Button>
            </form>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sick Beasts. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/shipping" className="text-xs text-muted-foreground hover:text-primary">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 