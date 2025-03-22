/**
 * Sanity client utilities for the e-commerce store
 * Provides access to Sanity content from the frontend
 */
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Create a client for authenticated usage in the frontend
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

// Create a client for authenticated usage in the frontend
export const authenticatedClient = (token: string) => 
  createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })

// Helper for generating image URLs with only the asset reference data in your documents
const builder = imageUrlBuilder(client)

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Get all products with optional filters
 */
export async function getProducts(options: {
  featured?: boolean;
  limit?: number;
  sort?: string;
} = {}) {
  const { featured, limit = 50, sort = 'createdAt desc' } = options
  
  let query = `*[_type == "product"`
  
  if (featured !== undefined) {
    query += ` && featured == ${featured}`
  }
  
  query += `] | order(${sort})`
  
  if (limit) {
    query += ` [0...${limit}]`
  }
  
  query += `{
    _id,
    title,
    "slug": slug.current,
    price,
    mainImage,
    shortDescription,
    inStock,
    featured,
    sizes
  }`
  
  return client.fetch(query)
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      mainImage,
      additionalImages,
      description,
      shortDescription,
      price,
      sizes,
      inStock,
      sustainabilityInfo,
      createdAt
    }`, 
    { slug }
  )
}

/**
 * Get newsletter subscribers with pagination
 */
export async function getNewsletterSubscribers(options: {
  status?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const { status, page = 1, pageSize = 20 } = options
  const start = (page - 1) * pageSize
  const end = start + pageSize
  
  let query = `*[_type == "newsletter"`
  
  if (status) {
    query += ` && status == "${status}"`
  }
  
  query += `] | order(subscribedAt desc) [${start}...${end}]{
    _id,
    email,
    firstName,
    lastName,
    status,
    subscribedAt,
    preferences
  }`
  
  return client.fetch(query)
}

/**
 * Get orders with optional filters and pagination
 */
export async function getOrders(options: {
  status?: string;
  customerId?: string;
  page?: number;
  pageSize?: number;
} = {}) {
  const { status, customerId, page = 1, pageSize = 20 } = options
  const start = (page - 1) * pageSize
  const end = start + pageSize
  
  let query = `*[_type == "order"`
  
  const conditions = []
  
  if (status) {
    conditions.push(`status == "${status}"`)
  }
  
  if (customerId) {
    conditions.push(`customer._ref == "${customerId}"`)
  }
  
  if (conditions.length) {
    query += ` && ${conditions.join(' && ')}`
  }
  
  query += `] | order(createdAt desc) [${start}...${end}]{
    _id,
    orderNumber,
    customer->{
      email,
      firstName,
      lastName
    },
    totalAmount,
    status,
    createdAt,
    items[]{
      product->{
        _id,
        title,
        mainImage
      },
      quantity,
      size,
      price
    }
  }`
  
  return client.fetch(query)
}
