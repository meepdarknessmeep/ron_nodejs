"use strict";

const util = require("util");
const EquipmentItem = require("./EquipmentItem.js");
const EquipmentItemTypes = require("../EquipmentItemTypes.js");

let HarvesterItem = function HarvesterItem(buf)
{

    this.BufferLeft = buf.slice(1);

    this.Class = buf.readInt8(0);

}

util.inherits(HarvesterItem, EquipmentItem);

HarvesterItem.prototype.GetName = function()
{
	switch (this.Class)
	{
	default:
		return "Unknown?";
	case 0:
		return "LCD-V1";
	case 11:
		return "LCD-V2";
	case 12:
		return "LCD-V3";
	case 13:
		return "LCD-V4";
	case 14:
		return "LCD-V5";
	case 15:
		return "LCD-V6";
	case 16:
		return "LCD-V7";
	case 17:
		return "LCD-V8";
	case 18:
		return "LCD-V9";
	case 19:
		return "LCD-V10";
	case 20:
		return "LCD-V11";
	case 21:
		return "LCD-V12";
	case 1:
		return "HX-V1";
	case 31:
		return "HX-V2";
	case 32:
		return "HX-V3";
	case 33:
		return "HX-V4";
	case 34:
		return "HX-V5";
	case 35:
		return "HX-V6";
	case 36:
		return "HX-V7";
	case 37:
		return "HX-V8";
	case 38:
		return "HX-V9";
	case 39:
		return "HX-V10";
	case 40:
		return "HX-V11";
	case 41:
		return "HX-V12";
	case 2:
		return "WP-V1";
	case 51:
		return "WP-V2";
	case 52:
		return "WP-V3";
	case 53:
		return "WP-V4";
	case 54:
		return "WP-V5";
	case 55:
		return "WP-V6";
	case 56:
		return "WP-V7";
	case 57:
		return "WP-V8";
	case 58:
		return "WP-V9";
	case 59:
		return "WP-V10";
	case 60:
		return "WP-V11";
	case 61:
		return "WP-V12";
	case 3:
		return "DCD-V1";
	case 71:
		return "DCD-V2";
	case 72:
		return "DCD-V3";
	case 73:
		return "DCD-V4";
	case 74:
		return "DCD-V5";
	case 75:
		return "DCD-V6";
	case 76:
		return "DCD-V7";
	case 77:
		return "DCD-V8";
	case 78:
		return "DCD-V9";
	case 79:
		return "DCD-V10";
	case 80:
		return "DCD-V11";
	case 81:
		return "DCD-V12";
	}
}

module.exports = HarvesterItem;
