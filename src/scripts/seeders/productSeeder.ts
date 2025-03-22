/**
 * Product seeder for Sanity CMS
 * Seeds product data for the e-commerce store
 */
import { seedClient as client, logEnvStatus } from './sanityClient'
import slug from 'slug'
import fs from 'fs'
import path from 'path'
import { ProductSeedData } from './types'

// Mock product data to be seeded
const products: ProductSeedData[] = [
  {
    title: 'Toxic Waste',
    description: 'Dark humor meets environmental awareness with this bold design that highlights the effects of pollution in a tongue-in-cheek way.',
    shortDescription: 'Dark humor meets environmental awareness.',
    price: 29.99,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
    sustainabilityInfo: {
      materials: '100% Organic Cotton',
      certifications: ['GOTS', 'Fair Trade'],
      carbonFootprint: 'Low-impact printing process'
    },
    imagePath: 'shirt-1.jpg'
  },
  {
    title: 'Skate or Die',
    description: 'A modern twist on the classic skate slogan, featuring a gritty design that captures the rebellious spirit of skate culture.',
    shortDescription: 'Classic skate slogan with a modern twist.',
    price: 29.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
    sustainabilityInfo: {
      materials: '100% Organic Cotton',
      certifications: ['GOTS'],
      carbonFootprint: 'Low-impact printing process'
    },
    imagePath: 'shirt-2.jpg'
  },
  {
    title: 'Recycle Your Politicians',
    description: 'A satirical take on political waste, this design suggests an alternative recycling program with a dark humorous edge.',
    shortDescription: 'A satirical take on political waste.',
    price: 32.99,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    sustainabilityInfo: {
      materials: '100% Organic Cotton',
      certifications: ['GOTS', 'Fair Trade'],
      carbonFootprint: 'Low-impact printing process'
    },
    imagePath: 'shirt-3.jpg'
  },
  {
    title: '404: Planet Not Found',
    description: 'A clever blend of tech humor and environmental messaging that warns about our planet\'s future with a dark twist.',
    shortDescription: 'Tech humor with an environmental message.',
    price: 29.99,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: false,
    sustainabilityInfo: {
      materials: '100% Organic Cotton',
      certifications: ['GOTS'],
      carbonFootprint: 'Low-impact printing process'
    },
    imagePath: 'shirt-4.jpg'
  },
  {
    title: 'Apocalypse Skater',
    description: 'Featuring a skater riding through an apocalyptic landscape, this design embraces the "ride till the end" mentality with dark humor.',
    shortDescription: 'Ride through the end times in style.',
    price: 29.99,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    sustainabilityInfo: {
      materials: '100% Organic Cotton',
      certifications: ['GOTS', 'Fair Trade'],
      carbonFootprint: 'Low-impact printing process'
    },
    imagePath: 'shirt-5.jpg'
  },
  {
    title: 'Plastic Is So Last Century',
    description: 'A bold statement against plastic pollution, this design uses sarcasm and striking visuals to promote sustainable living.',
    shortDescription: 'Fighting plastic pollution with humor.',
    price: 32.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
    sustainabilityInfo: {
      materials: '100% Organic Cotton',
      certifications: ['GOTS', 'Fair Trade'],
      carbonFootprint: 'Low-impact printing process'
    },
    imagePath: 'shirt-6.jpg'
  }
]

/**
 * Uploads an image to Sanity
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<string>} - The image reference ID
 */
async function uploadImage(imagePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), 'public/images/dummy-shirts', imagePath)
    
    // Check if the image exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️ Image not found: ${fullPath}`)
      return ''
    }
    
    // Read the image file
    const imageBuffer = fs.readFileSync(fullPath)
    
    // Upload the image to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    })
    
    return asset._id
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error)
    return ''
  }
}

/**
 * Seeds product data to Sanity CMS
 */
export async function seedProducts() {
  try {
    console.log('🌱 Starting product seeding process...')
    logEnvStatus()
    
    for (const product of products) {
      // Generate a slug from the title
      const slugged = slug(product.title, { lower: true })
      
      // Check if product with the same slug already exists
      const existingProducts = await client.fetch(
        `*[_type == "product" && slug.current == "${slugged}"]`
      )
      
      if (existingProducts.length > 0) {
        console.log(`⚠️ Product with slug "${slugged}" already exists. Skipping...`)
        continue
      }
      
      // Upload the image and get the reference
      let imageRef = ''
      if (product.imagePath) {
        console.log(`📷 Uploading image for ${product.title}...`)
        imageRef = await uploadImage(product.imagePath)
      }
      
      // Create the document structure for Sanity
      const doc = {
        _type: 'product',
        title: product.title,
        slug: {
          _type: 'slug',
          current: slugged
        },
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        sizes: product.sizes,
        inStock: product.inStock,
        featured: product.featured,
        sustainabilityInfo: product.sustainabilityInfo,
        mainImage: imageRef ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageRef
          }
        } : undefined,
        createdAt: new Date().toISOString()
      }
      
      // Create the document in Sanity
      const result = await client.create(doc)
      console.log(`✅ Created product: ${result.title} (ID: ${result._id})`)
    }
    
    console.log('🎉 Product seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding products:', error)
    throw error
  }
}

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedProducts()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
} 