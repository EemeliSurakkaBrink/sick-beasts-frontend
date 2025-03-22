/**
 * Schema for newsletter subscribers in the e-commerce store
 */
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newsletter',
  title: 'Newsletter',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Subscription Status',
      type: 'string',
      options: {
        list: [
          { title: 'Subscribed', value: 'subscribed' },
          { title: 'Unsubscribed', value: 'unsubscribed' },
          { title: 'Pending', value: 'pending' },
        ],
      },
      initialValue: 'subscribed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Subscription Source',
      type: 'string',
      options: {
        list: [
          { title: 'Website', value: 'website' },
          { title: 'Checkout', value: 'checkout' },
          { title: 'Manual Import', value: 'manual' },
        ],
      },
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'unsubscribedAt',
      title: 'Unsubscribed At',
      type: 'datetime',
    }),
    defineField({
      name: 'preferences',
      title: 'Email Preferences',
      type: 'object',
      fields: [
        {
          name: 'promotions',
          title: 'Promotions',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'newArrivals',
          title: 'New Arrivals',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      status: 'status',
    },
    prepare({ title, firstName, lastName, status }) {
      const name = [firstName, lastName].filter(Boolean).join(' ')
      return {
        title: name ? `${name} (${title})` : title,
        subtitle: `Status: ${status}`,
      }
    },
  },
}) 