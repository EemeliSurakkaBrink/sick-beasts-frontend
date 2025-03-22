/**
 * Schema for inventory management in the e-commerce store
 * Primarily used for Gelato print-on-demand integration
 */
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'inventory',
  title: 'Inventory',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gelatoStatus',
      title: 'Gelato Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Limited', value: 'limited' },
          { title: 'Unavailable', value: 'unavailable' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'sizeQuantities',
      title: 'Size Quantities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              options: {
                list: [
                  { title: 'XS', value: 'XS' },
                  { title: 'S', value: 'S' },
                  { title: 'M', value: 'M' },
                  { title: 'L', value: 'L' },
                  { title: 'XL', value: 'XL' },
                  { title: 'XXL', value: 'XXL' },
                ],
              },
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              initialValue: 999, // Effectively unlimited for print-on-demand
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'gelatoProductId',
      title: 'Gelato Product ID',
      type: 'string',
      description: 'Product ID in the Gelato system',
    }),
    defineField({
      name: 'gelatoVariantIds',
      title: 'Gelato Variant IDs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'size',
              title: 'Size',
              type: 'string',
            },
            {
              name: 'variantId',
              title: 'Variant ID',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Maps sizes to specific variant IDs in the Gelato system',
    }),
    defineField({
      name: 'lastSyncedAt',
      title: 'Last Synced with Gelato',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Any special notes about inventory or production',
    }),
  ],
  preview: {
    select: {
      title: 'product.title',
      status: 'gelatoStatus',
    },
    prepare({ title, status }) {
      return {
        title: title || 'Untitled Product',
        subtitle: `Status: ${status}`,
      }
    },
  },
}) 