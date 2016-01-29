"use strict";

const util = require("util");
const EquipmentItem = require("./EquipmentItem.js");
const EquipmentItemTypes = require("../EquipmentItemTypes.js");

let EngineItem = function EngineItem(buf)
{

    this.BufferLeft = buf.slice(1);

    this.Class = buf.readInt8(0);

}

util.inherits(EngineItem, EquipmentItem);

EngineItem.prototype.GetName = function()
{
	switch (this.Class)
	{
	default:
		return "Unknown?";
	case 0:
		return "Gravity Drive";
	case 1:
		return "Skip Drive";
	case 2:
		return "Stealth Drive";
	case 3:
		return "Neutron Drive";
	case 4:
		return "Fusion Drive";
	}
}

module.exports = EngineItem;
