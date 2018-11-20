import * as jwt from 'jsonwebtoken'

export const signToken = user => jwt.sign(user, process.env.APP_SECRET)

export const getUserData = userData => {
  // no returning the password to the browser!
  const { password, ...result } = userData
  return result
}
