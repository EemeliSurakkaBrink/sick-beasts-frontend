/**
 * Defines the structure of the Sanity Studio for the e-commerce store
 * Organizes content types into logical categories for better management
 */
import { StructureBuilder } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Sick Beasts Content')
    .items([
      // Products Category
      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Product Management')
            .items([
              S.listItem()
                .title('All Products')
                .schemaType('product')
                .child(S.documentTypeList('product').title('All Products')),
              S.listItem()
                .title('Inventory')
                .schemaType('inventory')
                .child(S.documentTypeList('inventory').title('Inventory Management')),
            ])
        ),

      // Orders & Transactions
      S.listItem()
        .title('Sales')
        .child(
          S.list()
            .title('Sales Management')
            .items([
              S.listItem()
                .title('Orders')
                .schemaType('order')
                .child(S.documentTypeList('order').title('All Orders')),
              S.listItem()
                .title('Transactions')
                .schemaType('transaction')
                .child(S.documentTypeList('transaction').title('All Transactions')),
            ])
        ),

      // Customer Management
      S.listItem()
        .title('Customers')
        .child(
          S.list()
            .title('Customer Management')
            .items([
              S.listItem()
                .title('User Accounts')
                .schemaType('user')
                .child(S.documentTypeList('user').title('All Users')),
              S.listItem()
                .title('Newsletter Subscribers')
                .schemaType('newsletter')
                .child(S.documentTypeList('newsletter').title('All Subscribers')),
            ])
        ),

      // Individual Document Types for direct access
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['product', 'inventory', 'order', 'transaction', 'user', 'newsletter'].includes(
            listItem.getId() || ''
          )
      ),
    ])
