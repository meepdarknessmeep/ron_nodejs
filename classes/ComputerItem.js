"use strict";

const util = require("util");
const EquipmentItem = require("./EquipmentItem.js");
const EquipmentItemTypes = require("../EquipmentItemTypes.js");

let ComputerItem = function ComputerItem(buf)
{

    this.BufferLeft = buf.slice(1);

    this.Class = buf.readInt8(0);

}

util.inherits(ComputerItem, EquipmentItem);

ComputerItem.prototype.GetName = function()
{
	switch (this.Class)
	{
	default:
		return "Unknown?";
	case 1:
		return "Sage Mk. I";
	case 2:
		return "Sage Mk. II";
	case 3:
		return "Sage Mk. III";
	case 4:
		return "Sage Mk. IV";
	case 5:
		return "Toil Mk. I";
	case 6:
		return "Toil Mk. II";
	case 7:
		return "Toil Mk. III";
	case 8:
		return "Toil Mk. IV";
	case 9:
		return "Havok Mk. I";
	case 10:
		return "Havok Mk. II";
	case 11:
		return "Havok Mk. III";
	case 12:
		return "Havok Mk. IV";
	case 13:
		return "Cabal Mk. I";
	case 14:
		return "Cabal Mk. II";
	case 15:
		return "Cabal Mk. III";
	case 16:
		return "Cabal Mk. IV";
	case 17:
		return "Agent Mk. I";
	case 18:
		return "Agent Mk. II";
	case 19:
		return "Agent Mk. III";
	case 20:
		return "Agent Mk. IV";
	case 21:
		return "Drone Mk. I";
	case 22:
		return "Drone Mk. II";
	case 23:
		return "Drone Mk. III";
	case 24:
		return "Drone Mk. IV";
	case 25:
		return "Warrior Mk. I";
	case 26:
		return "Warrior Mk. II";
	case 27:
		return "Warrior Mk. III";
	case 28:
		return "Warrior Mk. IV";
	case 29:
		return "Sage Tech I";
	case 30:
		return "Toil Tech I";
	case 31:
		return "Havok Tech I";
	case 32:
		return "Cabal Tech I";
	case 33:
		return "Agent Tech I";
	case 34:
		return "Drone Tech I";
	case 35:
		return "Warrior Tech I";
	case 36:
		return "Sage Tech II";
	case 37:
		return "Toil Tech II";
	case 38:
		return "Havok Tech II";
	case 39:
		return "Cabal Tech II";
	case 40:
		return "Agent Tech II";
	case 41:
		return "Drone Tech II";
	case 42:
		return "Warrior Tech II";
	case 43:
		return "Sage Tech III";
	case 44:
		return "Toil Tech III";
	case 45:
		return "Havok Tech III";
	case 46:
		return "Cabal Tech III";
	case 47:
		return "Agent Tech III";
	case 48:
		return "Drone Tech III";
	case 49:
		return "Warrior Tech III";
	}
}

module.exports = ComputerItem;
