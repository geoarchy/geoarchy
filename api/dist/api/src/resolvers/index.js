"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query = require("./Query");
const Mutation = require("./Mutation");
const Scalars = require("./scalars");
// import { book } from './Mutation/book'
// import { addPaymentMethod } from './Mutation/addPaymentMethod'
exports.resolvers = {
    Query,
    Mutation,
    ...Scalars,
};
//# sourceMappingURL=index.js.map