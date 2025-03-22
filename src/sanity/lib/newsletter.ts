/**
 * Utilities for newsletter management in the e-commerce store
 * Handles subscription, unsubscription, and email campaign management
 */
import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../env'

// Create a client specifically for newsletter operations
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

/**
 * Subscribe a user to the newsletter
 */
export async function subscribeToNewsletter(email: string, firstName?: string, lastName?: string, source = 'website') {
  try {
    // Check if the email already exists
    const existingSubscriber = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    )

    if (existingSubscriber) {
      // If exists but unsubscribed, update to subscribed
      if (existingSubscriber.status === 'unsubscribed') {
        await client.patch(existingSubscriber._id)
          .set({
            status: 'subscribed',
            subscribedAt: new Date().toISOString(),
            unsubscribedAt: null,
            firstName: firstName || existingSubscriber.firstName,
            lastName: lastName || existingSubscriber.lastName,
            source: source || existingSubscriber.source,
          })
          .commit()

        return {
          success: true,
          message: 'Re-subscribed to newsletter',
          subscriberId: existingSubscriber._id
        }
      }

      return {
        success: true,
        message: 'Already subscribed to newsletter',
        subscriberId: existingSubscriber._id
      }
    }

    // Create new subscriber
    const newSubscriber = await client.create({
      _type: 'newsletter',
      email,
      firstName,
      lastName,
      status: 'subscribed',
      source,
      subscribedAt: new Date().toISOString(),
      preferences: {
        promotions: true,
        newArrivals: true
      }
    })

    return {
      success: true,
      message: 'Successfully subscribed to newsletter',
      subscriberId: newSubscriber._id
    }
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Unsubscribe a user from the newsletter
 */
export async function unsubscribeFromNewsletter(email: string) {
  try {
    const subscriber = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    )

    if (!subscriber) {
      return {
        success: false,
        error: 'Email not found in newsletter list'
      }
    }

    await client.patch(subscriber._id)
      .set({
        status: 'unsubscribed',
        unsubscribedAt: new Date().toISOString()
      })
      .commit()

    return {
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    }
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Update a subscriber's preferences
 */
export async function updateNewsletterPreferences(email: string, preferences: {
  promotions?: boolean;
  newArrivals?: boolean;
}) {
  try {
    const subscriber = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    )

    if (!subscriber) {
      return {
        success: false,
        error: 'Email not found in newsletter list'
      }
    }

    const updatedPreferences = {
      ...subscriber.preferences,
      ...preferences
    }

    await client.patch(subscriber._id)
      .set({
        preferences: updatedPreferences
      })
      .commit()

    return {
      success: true,
      message: 'Successfully updated newsletter preferences'
    }
  } catch (error) {
    console.error('Error updating newsletter preferences:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
} 