/**
 * Utilities for integrating with Gelato print-on-demand service
 * Handles product syncing, order fulfillment, and inventory management
 */
import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../env'

// Define types for our Gelato integration
interface GelatoVariant {
  size: string;
  variantId: string;
}

interface OrderItem {
  product: {
    _id: string;
    [key: string]: any;
  };
  size: string;
  quantity: number;
  [key: string]: any;
}

interface InventoryDoc {
  gelatoVariantIds: GelatoVariant[];
  gelatoProductId: string;
  [key: string]: any;
}

// Create a client specifically for Gelato operations
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

/**
 * Syncs a product with Gelato
 */
export async function syncProductWithGelato(productId: string) {
  try {
    // 1. Get product details from Sanity
    const product = await client.fetch(
      `*[_type == "product" && _id == $productId][0]`,
      { productId }
    )

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`)
    }

    // 2. Simulate API call to Gelato (replace with actual Gelato API in production)
    // const gelatoResponse = await fetch('https://api.gelato.com/products', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.GELATO_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     name: product.title,
    //     description: product.description,
    //     // Add other required fields for Gelato
    //   })
    // })
    
    // const gelatoData = await gelatoResponse.json()
    
    // Simulate Gelato response for development
    const gelatoData = {
      id: `gelato-${Date.now()}`,
      status: 'available',
      variants: [
        { size: 'S', variantId: `var-S-${Date.now()}` },
        { size: 'M', variantId: `var-M-${Date.now()}` },
        { size: 'L', variantId: `var-L-${Date.now()}` },
      ]
    }

    // 3. Update or create inventory record
    const inventoryDoc = await client.fetch(
      `*[_type == "inventory" && product._ref == $productId][0]`,
      { productId }
    )

    if (inventoryDoc) {
      // Update existing inventory
      await client.patch(inventoryDoc._id)
        .set({
          gelatoStatus: gelatoData.status,
          gelatoProductId: gelatoData.id,
          gelatoVariantIds: gelatoData.variants.map(v => ({
            size: v.size,
            variantId: v.variantId
          })),
          lastSyncedAt: new Date().toISOString()
        })
        .commit()
    } else {
      // Create new inventory record
      await client.create({
        _type: 'inventory',
        product: { _type: 'reference', _ref: productId },
        gelatoStatus: gelatoData.status,
        gelatoProductId: gelatoData.id,
        gelatoVariantIds: gelatoData.variants.map(v => ({
          size: v.size,
          variantId: v.variantId
        })),
        sizeQuantities: product.sizes.map((size: string) => ({
          size,
          quantity: 999 // Effectively unlimited for POD
        })),
        lastSyncedAt: new Date().toISOString()
      })
    }

    return {
      success: true,
      productId,
      gelatoId: gelatoData.id
    }
  } catch (error) {
    console.error('Error syncing with Gelato:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Submits an order to Gelato for fulfillment
 */
export async function createGelatoOrder(orderId: string) {
  try {
    // 1. Get order details from Sanity
    const order = await client.fetch(
      `*[_type == "order" && _id == $orderId][0]{
        ...,
        items[]{
          ...,
          product->
        }
      }`,
      { orderId }
    )

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`)
    }

    // 2. Get inventory information for each product
    const inventoryDetails = await Promise.all(
      order.items.map(async (item: OrderItem) => {
        const inventory = await client.fetch(
          `*[_type == "inventory" && product._ref == $productId][0]`,
          { productId: item.product._id }
        )
        return {
          item,
          inventory: inventory as InventoryDoc
        }
      })
    )

    // 3. Prepare Gelato order payload
    const gelatoItems = inventoryDetails.map(({ item, inventory }) => {
      // Find the matching variant ID for the size
      const variantInfo = inventory.gelatoVariantIds.find(
        (v: GelatoVariant) => v.size === item.size
      )

      return {
        variantId: variantInfo?.variantId,
        quantity: item.quantity,
        gelatoProductId: inventory.gelatoProductId
      }
    })

    // 4. Simulate API call to Gelato (replace with actual Gelato API in production)
    // In a real implementation, we would use gelatoItems in the API request
    // const gelatoResponse = await fetch('https://api.gelato.com/orders', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.GELATO_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     items: gelatoItems,
    //     shippingAddress: order.shippingAddress,
    //     // Add other required fields for Gelato
    //   })
    // })
    
    // const gelatoOrderData = await gelatoResponse.json()
    
    // Simulate Gelato response for development
    const gelatoOrderData = {
      id: `gelato-order-${Date.now()}`,
      status: 'processing',
      trackingNumber: `track-${Date.now()}`
    }

    // 5. Update order with Gelato information
    await client.patch(orderId)
      .set({
        status: 'processing',
        trackingNumber: gelatoOrderData.trackingNumber,
        updatedAt: new Date().toISOString()
      })
      .commit()

    return {
      success: true,
      orderId,
      gelatoOrderId: gelatoOrderData.id,
      trackingNumber: gelatoOrderData.trackingNumber
    }
  } catch (error) {
    console.error('Error creating Gelato order:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
} 