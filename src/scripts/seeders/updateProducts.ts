/**
 * Utility to update existing products in Sanity CMS
 */
import { seedClient } from './sanityClient';
import { logEnvStatus } from './sanityClient';

interface ProductUpdate {
  slug: string;
  updates: Record<string, unknown>;
}

// Products to update
const productsToUpdate: ProductUpdate[] = [
  {
    slug: 'toxic-waste',
    updates: { featured: true }
  },
  {
    slug: 'skate-or-die',
    updates: { featured: true }
  },
  {
    slug: '404-planet-not-found',
    updates: { featured: true }
  },
  {
    slug: 'apocalypse-skater',
    updates: { featured: false }
  },
  {
    slug: 'plastic-is-so-last-century',
    updates: { featured: false }
  }
];

/**
 * Updates existing products in Sanity CMS
 */
export async function updateProducts() {
  try {
    console.log('🔄 Starting product update process...');
    logEnvStatus();

    for (const productUpdate of productsToUpdate) {
      try {
        // Find the product by slug
        const products = await seedClient.fetch(
          `*[_type == "product" && slug.current == $slug]`,
          { slug: productUpdate.slug }
        );

        if (products.length === 0) {
          console.log(`⚠️ Product with slug "${productUpdate.slug}" not found. Skipping...`);
          continue;
        }

        const product = products[0];
        console.log(`📝 Updating product: ${product.title} (ID: ${product._id})...`);

        // Apply the updates
        await seedClient
          .patch(product._id)
          .set(productUpdate.updates)
          .commit();

        console.log(`✅ Updated product: ${product.title}`);
      } catch (error) {
        console.error(`❌ Error updating product ${productUpdate.slug}:`, error);
      }
    }

    console.log('🎉 Product updates completed successfully!');
  } catch (error) {
    console.error('❌ Error updating products:', error);
    throw error;
  }
}

// Run the updater if this file is executed directly
if (require.main === module) {
  updateProducts()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
} 