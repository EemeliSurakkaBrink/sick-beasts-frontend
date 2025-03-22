/**
 * Main seeder file that runs all data seeders
 * Allows seeding all data or specific datasets to Sanity CMS
 */
import { seedProducts } from './productSeeder'

// Available seeders
const seeders = {
  products: seedProducts,
  // Add more seeders here as they are created
}

/**
 * Runs all seeders or specific seeders if specified
 * @param {string[]} only - Optional array of seeder names to run
 */
async function runSeeders(only?: string[]) {
  try {
    console.log('🚀 Starting data seeding process...\n')
    
    // If specific seeders are specified, only run those
    const seedersToRun = only && only.length > 0
      ? only.filter(name => name in seeders)
      : Object.keys(seeders)
    
    if (seedersToRun.length === 0) {
      console.log('⚠️ No valid seeders specified to run')
      return
    }
    
    // Run each seeder in sequence
    for (const name of seedersToRun) {
      console.log(`\n📌 Running ${name} seeder...`)
      await seeders[name as keyof typeof seeders]()
    }
    
    console.log('\n✨ All data seeding completed successfully!')
  } catch (error) {
    console.error('\n❌ Error running seeders:', error)
    process.exit(1)
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2)
  const only = args.includes('--only') 
    ? args.slice(args.indexOf('--only') + 1).filter(arg => !arg.startsWith('--'))
    : undefined
  
  return { only }
}

// Run the seeders if this file is executed directly
if (require.main === module) {
  const { only } = parseArgs()
  
  if (only && only.length > 0) {
    console.log(`Running only specified seeders: ${only.join(', ')}`)
  } else {
    console.log('Running all available seeders')
  }
  
  runSeeders(only)
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
} 