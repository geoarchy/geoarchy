"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = (_parent, args, ctx) => {
    return ctx.db.getAccount({ email: args.email });
};
exports.map = async (_parent, args, ctx) => {
    return ctx.db.getMapDisplay({ id: args.id });
};
//# sourceMappingURL=index.js.map