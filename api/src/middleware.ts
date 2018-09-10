const expressJwt = require("express-jwt");
// import { getUserData } from './resolvers/utils';
// import gql from 'graphql-tag'
// const userQuery = gql`
//   {
//     id
//     roles {
//       slug
//     }
//     email
//     firstName
//     lastName
//     memberships {
//       id
//       roles {
//         slug
//       }
//       team {
//         id
//         name
//       }
//     }
//   }
// `

export const checkJwt = expressJwt({
  secret: process.env.APP_SECRET!,
  requestProperty: "tokenData",
  credentialsRequired: false
});

export const getUser = async (req, res, next, db) => {
  // if (!req.tokenData || !req.tokenData.userId) {
  //   // anonymous user
  //   return next()
  // }
  return next();
  // if (req.user) {
  //   // JWT is authorized on every request, but we dont need new account data on every request
  //   return next()
  // }
  // try {
  //   const user = await db.accounts.getDocument(req.tokenData.userId);
  //   req.user = getUserData(await user.getDocument())
  //   console.log('getUser', req.user)
  //   next()
  // } catch (err) {
  //   return next()
  // }
};
