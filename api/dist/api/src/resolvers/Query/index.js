"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = (parent, args, ctx, info) => {
    return ctx.db.getAccount({ email: args.email });
};
exports.map = async (parent, args, ctx, info) => {
    return ctx.db.getMapDisplay({ id: args.id });
};
//# sourceMappingURL=index.js.map