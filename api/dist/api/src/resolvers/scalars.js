"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("graphql/language");
const graphql_1 = require("graphql");
exports.Anything = new graphql_1.GraphQLScalarType({
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
});
exports.Date = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new exports.Date(value); // value from the client
    },
    serialize(value) {
        return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
        if (ast.kind === language_1.Kind.INT) {
            return new exports.Date(ast.value); // ast value is always in string format
        }
        return null;
    },
});
//# sourceMappingURL=scalars.js.map