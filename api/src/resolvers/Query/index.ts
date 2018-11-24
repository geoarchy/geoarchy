import { Context } from '../../typings'

export const account = (_parent, args, ctx: Context) => {
  return ctx.db.getAccount({ email: args.email })
}

export const map = async (_parent, args: { id: String }, ctx: Context) => {
  return ctx.db.getMapDisplay({ id: args.id })
}
