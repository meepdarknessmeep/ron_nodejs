"use strict";

const util = require("util");
const EquipmentItem = require("./EquipmentItem.js");
const EquipmentItemTypes = require("../EquipmentItemTypes.js");

let ArmorItem = function ArmorItem(buf)
{

    this.BufferLeft = buf.slice(2);

    this.Class = buf.readInt8(0);
    this.BaseEP = buf.readInt8(1);

}

util.inherits(ArmorItem, EquipmentItem);

ArmorItem.prototype.GetName = function()
{
	switch (this.Class)
	{
	default:
		return "Unknown?";
	case 0:
		return "Titanium Hull";
	case 1:
		return "Composite Hull";
	case 2:
		return "Carbide Hull";
	case 10:
		return "Exoprene Shield";
	case 11:
		return "Cytoplast Shield";
	case 12:
		return "Holocrine Shield";
	case 20:
		return "Diamond Armor";
	case 21:
		return "Thorium Armor";
	case 22:
		return "Osmium Armor";
	case 30:
		return "Citadel Gambit";
	case 31:
		return "Ajax Gambit";
	case 32:
		return "Aegis Gambit";
	case 33:
		return "Kismet Gambit";
	}
}

module.exports = ArmorItem;
