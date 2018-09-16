import { fsString } from "@geoarchy/utils";

import fetch from "node-fetch";

export const account = (parent, args, ctx, info) => {
  return ctx.db.accounts.getDocument(fsString(args.email));
};
export const map = async (parent, args, ctx, info) => {
  // if (!ctx.db.accountMaps) {
  //   await ctx.db.getAccountMapCollection(ctx.request.tokenData.userId);
  // }
  // await ctx.db.accountMaps(args.id);
  const result = await fetch(
    `https://s3.amazonaws.com/geoarchy.dev-maps/${args.username}/${fsString(
      args.id
    )}`
  );
  return result.json();
};
