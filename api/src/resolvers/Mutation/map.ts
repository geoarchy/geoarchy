import * as Geoarchy from '../../../../types'
import { Context } from '../../typings'

export const createMapDisplay = async (parent, args, ctx: Context) => {
  return ctx.db.createMapDisplay(args.data)
}

interface IMapUpdate {
  data: Geoarchy.TMapDisplay & { _id: String }
}

export async function updateMapDisplay(parent, args: IMapUpdate, ctx: Context) {
  return ctx.db.updateMapDisplay(args.data)
}

enum ItemTypes {
  components,
  layerGroups,
  themeSetting,
}

interface IMapItemUpdate {
  data: { mapId: string; itemType: ItemTypes; item; itemOp: string }
}

export const updateMapItem = async (parent, args: IMapItemUpdate, ctx) => {
  const { mapId, itemType, item, itemOp } = args.data
  return ctx.mapDb.display.findOneAndUpdate(
    { _id: mapId },
    { [`$${itemOp}`]: { [itemType]: item } }
  )
}
