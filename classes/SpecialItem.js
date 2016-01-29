"use strict";

const util = require("util");
const EquipmentItem = require("./EquipmentItem.js");
const EquipmentItemTypes = require("../EquipmentItemTypes.js");

let SpecialItem = function SpecialItem(buf)
{

    this.BufferLeft = buf.slice(1);

    this.Class = buf.readInt8(0);

}

util.inherits(SpecialItem, EquipmentItem);

SpecialItem.prototype.GetName = function()
{
	switch (this.Class)
	{
	default:
		return "Unknown?";
	case 0:
		return "Technician";
	case 1:
		return "Prospector";
	case 2:
		return "Tank";
	case 3:
		return "Scout";
	case 4:
		return "Tractor Beam";
	case 5:
		return "Nova Device";
	case 6:
		return "Battle Ram";
	case 7:
		return "Alien Hunter";
	case 8:
		return "Deflector";
	case 9:
		return "Grappling Hook";
	case 10:
		return "Advanced Construct";
	case 11:
		return "Advanced Shields";
	case 12:
		return "Advanced Electronics";
	case 13:
		return "Advanced Munitions";
	case 14:
		return "Advanced Propulsion";
	}
}

module.exports = SpecialItem;
