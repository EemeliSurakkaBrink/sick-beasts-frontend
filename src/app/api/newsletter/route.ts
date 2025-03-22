/**
 * API routes for newsletter management in the e-commerce store
 */
import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter, unsubscribeFromNewsletter, updateNewsletterPreferences } from '@/sanity/lib/newsletter'

export async function POST(request: NextRequest) {
  try {
    // Get request body for subscription
    const data = await request.json()
    
    // Validate required fields
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Subscribe to newsletter
    const result = await subscribeToNewsletter(
      data.email, 
      data.firstName, 
      data.lastName,
      data.source || 'website'
    )
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get email from query params
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Unsubscribe from newsletter
    const result = await unsubscribeFromNewsletter(email)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error)
    return NextResponse.json(
      { error: 'Failed to unsubscribe from newsletter' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Get request body for preference update
    const data = await request.json()
    
    // Validate required fields
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    if (!data.preferences) {
      return NextResponse.json(
        { error: 'Preferences are required' },
        { status: 400 }
      )
    }
    
    // Update preferences
    const result = await updateNewsletterPreferences(data.email, data.preferences)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating newsletter preferences:', error)
    return NextResponse.json(
      { error: 'Failed to update newsletter preferences' },
      { status: 500 }
    )
  }
} 