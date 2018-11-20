import * as Query from './Query'
import * as Mutation from './Mutation'
import * as Scalars from './scalars'

// import { book } from './Mutation/book'
// import { addPaymentMethod } from './Mutation/addPaymentMethod'

export const resolvers = {
  Query,
  Mutation,
  ...Scalars,
}
