import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import user from './user'
import order from './order'
import newsletter from './newsletter'
import transaction from './transaction'
import inventory from './inventory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, user, order, newsletter, transaction, inventory],
}
