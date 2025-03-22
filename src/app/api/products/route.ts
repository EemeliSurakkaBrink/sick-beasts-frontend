/**
 * API routes for product management in the e-commerce store
 */
import { NextRequest, NextResponse } from 'next/server'
import { authenticatedClient } from '@/sanity/lib/client'

export async function GET(request: NextRequest) {
  try {
    // Optionally get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    
    // Build query
    let query = `*[_type == "product"`
    
    if (featured) {
      query += ` && featured == ${featured === 'true'}`
    }
    
    query += `] | order(createdAt desc)`
    
    if (limit) {
      query += ` [0...${parseInt(limit)}]`
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
    
    // Use the client without a token for public read operations
    const client = authenticatedClient(process.env.SANITY_API_TOKEN || '')
    const products = await client.fetch(query)
    
    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication (in a real app, use proper auth middleware)
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Get request body
    const data = await request.json()
    
    // Validate required fields
    if (!data.title || !data.price) {
      return NextResponse.json(
        { error: 'Missing required fields: title and price are required' },
        { status: 400 }
      )
    }
    
    // Use authenticated client
    const client = authenticatedClient(process.env.SANITY_API_TOKEN || '')
    
    // Create slug from title if not provided
    if (!data.slug) {
      data.slug = {
        _type: 'slug',
        current: data.title
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
      }
    }
    
    // Add document type
    const productData = {
      _type: 'product',
      ...data,
      createdAt: new Date().toISOString()
    }
    
    // Create product in Sanity
    const product = await client.create(productData)
    
    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
} 