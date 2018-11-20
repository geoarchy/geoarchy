import { Context } from '../../typings'

export const account = (parent, args, ctx: Context, info) => {
  return ctx.db.getAccount({ email: args.email })
}

export const map = async (parent, args: { id: String }, ctx: Context, info) => {
  return ctx.db.getMapDisplay({ id: args.id })
}
