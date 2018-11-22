"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.signToken = user => jwt.sign(user, process.env.APP_SECRET);
exports.getUserData = userData => {
    // no returning the password to the browser!
    const { password, ...result } = userData;
    return result;
};
//# sourceMappingURL=utils.js.map