"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMapDisplay = async (_parent, args, ctx) => {
    return ctx.db.createMapDisplay(args.data);
};
async function updateMapDisplay(_parent, args, ctx) {
    return ctx.db.updateMapDisplay(args.data);
}
exports.updateMapDisplay = updateMapDisplay;
var ItemTypes;
(function (ItemTypes) {
    ItemTypes[ItemTypes["components"] = 0] = "components";
    ItemTypes[ItemTypes["layerGroups"] = 1] = "layerGroups";
    ItemTypes[ItemTypes["themeSetting"] = 2] = "themeSetting";
})(ItemTypes || (ItemTypes = {}));
exports.updateMapItem = async (_parent, args, ctx) => {
    const { mapId, itemType, item, itemOp } = args.data;
    return ctx.mapDb.display.findOneAndUpdate({ _id: mapId }, { [`$${itemOp}`]: { [itemType]: item } });
};
//# sourceMappingURL=map.js.map