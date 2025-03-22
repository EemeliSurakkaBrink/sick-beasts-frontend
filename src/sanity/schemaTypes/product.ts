/**
 * Schema for t-shirt products in the e-commerce store
 */
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'additionalImages',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.max(160).warning('Should be under 160 characters'),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [{ type: 'string' }],
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sustainabilityInfo',
      title: 'Sustainability Information',
      type: 'object',
      fields: [
        { 
          name: 'materials', 
          title: 'Materials', 
          type: 'string',
          description: 'E.g., 100% Organic Cotton',
        },
        { 
          name: 'certifications', 
          title: 'Certifications', 
          type: 'array',
          of: [{ type: 'string' }],
          description: 'E.g., GOTS, Fair Trade',
        },
        { 
          name: 'carbonFootprint', 
          title: 'Carbon Footprint', 
          type: 'string',
          description: 'Information about the carbon footprint',
        },
      ],
    }),
    defineField({
      name: 'gelatoProductId',
      title: 'Gelato Product ID',
      type: 'string',
      description: 'ID for the print-on-demand service integration',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      price: 'price',
    },
    prepare({ title, media, price }) {
      return {
        title,
        subtitle: `$${price}`,
        media,
      }
    },
  },
}) 