"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcryptjs");
const utils_1 = require("@geoarchy/utils");
const utils_2 = require("../utils");
exports.createAccount = async (_parent, args, ctx) => {
    const exists = await ctx.db.getAccount({
        email: utils_1.emailString(args.data.email),
    });
    if (exists) {
        throw Error('An account with this email already exists');
    }
    const accountData = await ctx.db.createAccount(args.data);
    return {
        account: utils_2.getUserData(accountData),
        token: utils_2.signToken({
            userId: accountData._id,
            email: args.data.email,
        }),
    };
};
exports.login = async (_parent, args, ctx) => {
    const account = await ctx.db.getAccount({
        email: utils_1.emailString(args.data.email),
    });
    if (!account) {
        throw new Error('Auth error');
    }
    const valid = await bcrypt.compare(args.data.password, account.password);
    if (valid) {
        return {
            account: utils_2.getUserData(account),
            token: utils_2.signToken({ userId: account._id, email: args.data.email }),
        };
    }
};
//# sourceMappingURL=account.js.map