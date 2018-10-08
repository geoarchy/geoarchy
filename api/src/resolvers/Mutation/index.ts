import { TMapDisplay } from '@geoarchy/types'
import * as bcrypt from "bcryptjs";
import { fsString } from "@geoarchy/utils";
import { Context } from "../../typings";
import { hashPass, getUserData, signToken } from "../utils";

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

function hasDuplicatesIds(array) {
 return !!array && array.length > 0 && hasDuplicates(array.map(({ id }) => id))
}

export const createMapDisplay = async (parent, args, ctx: Context, info) => {
  if (!ctx.db.accountMaps) {
    await ctx.db.getAccountMapCollection(ctx.request.tokenData.userId);
  }
  return ctx.db.accountMaps.saveDocument(args.data);
};

export const updateMapDisplay = async (parent, args: { data: TMapDisplay }, ctx: Context, info) => {
  if (!ctx.db.accountMaps) {
    await ctx.db.getAccountMapCollection(ctx.request.tokenData.userId);
  }

  if(hasDuplicatesIds(args.data.layerGroups)){
    throw Error("layer group id already exists")
  }

  if(hasDuplicatesIds(args.data.components)){
    throw Error("component id already exists")
  }

  // let previousVersion = await ctx.db.accountMaps.getDocument(args.data.id);
  console.log(info)
  return ctx.db.accountMaps.saveDocument(args.data);
};

export const createAccount = async (parent, args, ctx: Context, info) => {
  const exists = await ctx.db.accounts.exists(fsString(args.data.email));
  if (exists) {
    throw Error("An account with this email already exists");
  }
  const accountData = await ctx.db.accounts.saveDocument({
    ...args.data,
    password: await hashPass(args.data.password)
  });

  console.log("create", { accountData });

  // creates the sub collection (s3 folder) for use later
  await ctx.db.getAccountMapCollection(fsString(args.data.email));

  return {
    account: getUserData(accountData),
    token: signToken({ userId: accountData.id, email: args.data.email })
  };
};

export const login = async (parent, args, ctx, info) => {
  const [result] = await ctx.db.accounts.find(fsString(args.data.email));
  if (!result) {
    throw new Error("Auth error");
  }
  const account = await result.getDocument();
  const valid = await bcrypt.compare(args.data.password, account.password);
  if (valid) {
    return {
      account: getUserData(account),
      token: signToken({ userId: account.id, email: args.data.email })
    };
  }
};
