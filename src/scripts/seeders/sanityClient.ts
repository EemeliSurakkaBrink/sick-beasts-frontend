/**
 * Sanity client specifically for seeding data
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local')
}

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET in .env.local')
}

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-22'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  const setupPath = path.resolve(__dirname, 'SETUP.md')
  const setupExists = fs.existsSync(setupPath)
  
  console.error('\n❌ ERROR: Missing SANITY_API_TOKEN in .env.local')
  console.error('This token is required for seeding data to Sanity CMS.')
  console.error('\nTo set up the token:')
  
  if (setupExists) {
    console.error(`1. Read the setup guide: ${setupPath}`)
  } else {
    console.error('1. Go to https://www.sanity.io/manage and select your project')
    console.error('2. Navigate to the "API" tab and create a new token with Editor permissions')
    console.error('3. Add the token to your .env.local file:')
    console.error('   SANITY_API_TOKEN="your-token-here"')
  }
  
  console.error('\nFor more information, see the README.md file.\n')
  process.exit(1)
}

// Create a client for seeding data
export const seedClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // We need the freshest data and ability to write
})

// Helper for debug logging
export function logEnvStatus() {
  console.log('Environment configuration:')
  console.log(`- Project ID: ${projectId}`)
  console.log(`- Dataset: ${dataset}`)
  console.log(`- API Version: ${apiVersion}`)
  console.log(`- Token: ${token ? '✅ Set' : '❌ Missing'}`)
} 