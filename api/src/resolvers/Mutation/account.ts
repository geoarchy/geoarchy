import * as bcrypt from 'bcryptjs'
import { emailString } from '@geoarchy/utils'

import { Context } from '../../typings'
import { getUserData, signToken } from '../utils'

export const createAccount = async (parent, args, ctx: Context, info) => {
  const exists = await ctx.db.getAccount({
    email: emailString(args.data.email),
  })
  if (exists) {
    throw Error('An account with this email already exists')
  }
  const accountData = await ctx.db.createAccount(args.data)
  return {
    account: getUserData(accountData),
    token: signToken({
      userId: accountData._id,
      email: args.data.email,
    }),
  }
}

export const login = async (parent, args, ctx, info) => {
  const account = await ctx.db.getAccount({
    email: emailString(args.data.email),
  })
  if (!account) {
    throw new Error('Auth error')
  }
  const valid = await bcrypt.compare(args.data.password, account.password)
  if (valid) {
    return {
      account: getUserData(account),
      token: signToken({ userId: account._id, email: args.data.email }),
    }
  }
}
