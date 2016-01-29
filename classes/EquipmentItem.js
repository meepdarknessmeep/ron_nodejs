"use strict";

const EquipmentItemTypes = require("../EquipmentItemTypes.js");

let TypeInitializers;

const RarityTypes = [
    "Unknown?",
    "Common", "Uncommon",
    "Rare", "Ultra-Rare",
    "Legendary", "Precursor",
    "Ultimate"
]

let EquipmentItem = function EquipmentItem(buf)
{

    this.Type = buf.readInt8(0);

    if (TypeInitializers[this.Type])
    {
        let Initializer = TypeInitializers[this.Type];

        let ret = new Initializer(buf.slice(4));
        ret.Rarity = buf.readInt8(1);
        ret.Durability = buf.readInt8(2);
        ret.NoDrop = buf.readInt8(3) != -128;
        ret.Valid = true;

        return ret;
    }
    else
        this.Valid = false;

}

EquipmentItem.prototype.toString = function()
{

    return RarityTypes[this.Rarity] + " " + this.GetName() + " (" + this.Durability + ")";

}

module.exports = EquipmentItem;

TypeInitializers = {

    [EquipmentItemTypes.WEAPON]:    require("./WeaponItem.js"),
    [EquipmentItemTypes.ARMOR]:     require("./ArmorItem.js"),
    [EquipmentItemTypes.STORAGE]:   require("./StorageItem.js"),
    [EquipmentItemTypes.COMPUTER]:  require("./ComputerItem.js"),
    [EquipmentItemTypes.ENGINE]:    require("./EngineItem.js"),
    [EquipmentItemTypes.SPECIAL]:   require("./SpecialItem.js"),
    [EquipmentItemTypes.HARVESTER]: require("./HarvesterItem.js")

};
