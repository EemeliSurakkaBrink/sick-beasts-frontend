/**
 * Types for data seeders
 */

/**
 * Product data for seeding
 */
export interface ProductSeedData {
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  sustainabilityInfo: {
    materials: string;
    certifications: string[];
    carbonFootprint: string;
  };
  imagePath?: string;
}

/**
 * User data for seeding
 */
export interface UserSeedData {
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

/**
 * Order data for seeding
 */
export interface OrderSeedData {
  userEmail: string;
  items: {
    productSlug: string;
    quantity: number;
    size: string;
  }[];
  status: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

/**
 * Newsletter subscriber data for seeding
 */
export interface NewsletterSeedData {
  email: string;
  name?: string;
  subscribedAt: string;
  status: string;
} 