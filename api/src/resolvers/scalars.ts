import { Kind } from 'graphql/language'
import { GraphQLScalarType } from 'graphql'

export const Anything = new GraphQLScalarType({
  name: 'Anything',
  description: 'Anything',
  // invoked to parse client input that was passed through variables.
  // takes a plain JS object.
  parseValue: v => v,
  // invoked to parse client input that was passed inline in the query.
  // takes a value AST.
  parseLiteral: literal => literal,
  // invoked when serializing the result to send it back to a client.
  serialize: v => v,
})

export const Date = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value) // value from the client
  },
  serialize(value) {
    return value.getTime() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value) // ast value is always in string format
    }
    return null
  },
})
