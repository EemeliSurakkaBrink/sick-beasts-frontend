/**
 * API functions for fetching data from Sanity CMS
 */
import { client } from './client'
import { urlFor } from './image'
import type { SanityDocument } from '@sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

/**
 * Product interface for use in frontend components
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  sizes: string[];
  inStock: boolean;
  featured: boolean;
  imageUrl: string;
  sustainabilityInfo: {
    materials: string;
    certifications: string[];
    carbonFootprint: string;
  };
}

/**
 * Sanity product document type
 */
interface SanityProduct extends SanityDocument {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  shortDescription?: string;
  price: number;
  sizes?: string[];
  inStock?: boolean;
  featured?: boolean;
  mainImage?: SanityImageSource;
  sustainabilityInfo?: {
    materials: string;
    certifications: string[];
    carbonFootprint: string;
  };
}

/**
 * Fetch all products from Sanity CMS
 * @param options Optional parameters for filtering and sorting
 * @returns Array of products formatted for frontend use
 */
export async function getProducts(options: {
  featured?: boolean;
  limit?: number;
  sort?: string;
} = {}): Promise<Product[]> {
  const { featured, limit = 50, sort = 'createdAt desc' } = options;
  
  let query = `*[_type == "product"`;
  
  if (featured !== undefined) {
    query += ` && featured == ${featured}`;
  }
  
  query += `] | order(${sort})`;
  
  if (limit) {
    query += `[0...${limit}]`;
  }
  
  query += `{
    _id,
    title,
    "slug": slug.current,
    description,
    shortDescription,
    price,
    sizes,
    inStock,
    featured,
    mainImage,
    sustainabilityInfo
  }`;
  
  const products = await client.fetch<SanityProduct[]>(query);
  
  return products.map((product) => ({
    id: product._id,
    name: product.title,
    slug: product.slug.current,
    description: product.description,
    shortDescription: product.shortDescription || '',
    price: product.price,
    sizes: product.sizes || [],
    inStock: product.inStock !== false, // default to true if not specified
    featured: product.featured || false,
    imageUrl: product.mainImage ? urlFor(product.mainImage).url() : '',
    sustainabilityInfo: product.sustainabilityInfo || {
      materials: '100% Organic Cotton',
      certifications: [],
      carbonFootprint: ''
    }
  }));
}

/**
 * Fetch a single product by ID
 * @param id The product ID
 * @returns Product data or null if not found
 */
export async function getProductById(id: string): Promise<Product | null> {
  const query = `*[_type == "product" && _id == $id][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    shortDescription,
    price,
    sizes,
    inStock,
    featured,
    mainImage,
    sustainabilityInfo
  }`;
  
  const product = await client.fetch<SanityProduct | null>(query, { id });
  
  if (!product) return null;
  
  return {
    id: product._id,
    name: product.title,
    slug: product.slug.current,
    description: product.description,
    shortDescription: product.shortDescription || '',
    price: product.price,
    sizes: product.sizes || [],
    inStock: product.inStock !== false,
    featured: product.featured || false,
    imageUrl: product.mainImage ? urlFor(product.mainImage).url() : '',
    sustainabilityInfo: product.sustainabilityInfo || {
      materials: '100% Organic Cotton',
      certifications: [],
      carbonFootprint: ''
    }
  };
}

/**
 * Fetch a single product by slug
 * @param slug The product slug
 * @returns Product data or null if not found
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    shortDescription,
    price,
    sizes,
    inStock,
    featured,
    mainImage,
    sustainabilityInfo
  }`;
  
  const product = await client.fetch<SanityProduct | null>(query, { slug });
  
  if (!product) return null;
  
  return {
    id: product._id,
    name: product.title,
    slug: product.slug.current,
    description: product.description,
    shortDescription: product.shortDescription || '',
    price: product.price,
    sizes: product.sizes || [],
    inStock: product.inStock !== false,
    featured: product.featured || false,
    imageUrl: product.mainImage ? urlFor(product.mainImage).url() : '',
    sustainabilityInfo: product.sustainabilityInfo || {
      materials: '100% Organic Cotton',
      certifications: [],
      carbonFootprint: ''
    }
  };
} 