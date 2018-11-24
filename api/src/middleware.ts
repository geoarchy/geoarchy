const expressJwt = require("express-jwt");

export const checkJwt = expressJwt({
  secret: process.env.APP_SECRET!,
  requestProperty: "tokenData",
  credentialsRequired: false
});

export const getUser = async (req, _res, next, db) => {
  if (!req.tokenData || !req.tokenData.userId) {
    // anonymous user
    return next()
  }
  if (req.user) {
    // JWT is authorized on every request, but we dont need new account data on every request
    return next()
  }
  try {
    req.user = await db.getAccount(req.tokenData.userId);
    console.log(req.user)
  } catch (err) {
    return next()
  }
};
