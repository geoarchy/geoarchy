import * as bcrypt from 'bcryptjs';
import { fsString } from '@geoarchy/utils'
import { Context } from '../../typings';
import { hashPass, getUserData, signToken } from '../utils';


export const createMapDisplay = async (parent, args, ctx: Context, info) => {
    if (!ctx.db.accountMaps) {
        await ctx.db.getAccountMapCollection(ctx.request.tokenData.userId)
    }
    return ctx.db.accountMaps.saveDocument(args.data);
}

export const updateMapDisplay = async (parent, args, ctx: Context, info) => {
    if (!ctx.db.accountMaps) {
        await ctx.db.getAccountMapCollection(ctx.request.tokenData.userId)
    }
    return ctx.db.accountMaps.saveDocument(args.data);
}

export const createAccount = async (parent, args, ctx: Context, info) => {
    const exists = await ctx.db.accounts.exists(fsString(args.data.email))
    if (exists) {
        throw Error('An account with this email already exists')
    }
    const accountData = await ctx.db.accounts.saveDocument({ 
        ...args.data,
        password: await hashPass(args.data.password)
    });

    console.log('create', { accountData })

    // creates the sub collection (s3 folder) for use later
    await ctx.db.getAccountMapCollection(fsString(args.data.email))

    return { 
        account: getUserData(accountData),
        token: signToken({ userId: accountData.id, email: args.data.email })
    }
}

export const login = async (parent, args, ctx, info) => {
    const [result] = await ctx.db.accounts.find(fsString(args.data.email));
    if (!result) {
        throw new Error('Auth error')
    }
    const account = await result.getDocument();
    const valid = await bcrypt.compare(args.data.password, account.password)
    if (valid) {
        return {
            account: getUserData(account),
            token: signToken({ userId: account.id, email: args.data.email })
        }
    }
}
