/**
 * Schema for payment transactions in the e-commerce store
 */
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'transaction',
  title: 'Transaction',
  type: 'document',
  fields: [
    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Related Order',
      type: 'reference',
      to: [{ type: 'order' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Credit Card', value: 'credit_card' },
          { title: 'PayPal', value: 'paypal' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Transaction Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Completed', value: 'completed' },
          { title: 'Failed', value: 'failed' },
          { title: 'Refunded', value: 'refunded' },
        ],
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentGatewayData',
      title: 'Payment Gateway Data',
      type: 'object',
      fields: [
        {
          name: 'gateway',
          title: 'Gateway',
          type: 'string',
          options: {
            list: [
              { title: 'Stripe', value: 'stripe' },
              { title: 'PayPal', value: 'paypal' },
            ],
          },
        },
        {
          name: 'gatewayTransactionId',
          title: 'Gateway Transaction ID',
          type: 'string',
        },
        {
          name: 'gatewayResponse',
          title: 'Gateway Response',
          type: 'text',
        },
      ],
    }),
    defineField({
      name: 'billingAddress',
      title: 'Billing Address',
      type: 'object',
      fields: [
        { name: 'street', title: 'Street', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'state', title: 'State/Province', type: 'string' },
        { name: 'postalCode', title: 'Postal Code', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'transactionId',
      order: 'order.orderNumber',
      amount: 'amount',
      status: 'status',
    },
    prepare({ title, order, amount, status }) {
      return {
        title: `Transaction ${title}`,
        subtitle: `Order #${order} - ${status} - $${amount}`,
      }
    },
  },
}) 