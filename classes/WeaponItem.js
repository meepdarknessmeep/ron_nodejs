"use strict";

const util = require("util");
const EquipmentItem = require("./EquipmentItem.js");
const EquipmentItemTypes = require("../EquipmentItemTypes.js");

let WeaponItem = function WeaponItem(buf)
{

    this.BufferLeft = buf.slice(2);

    this.Class = buf.readInt8(0);
    this.BaseEP = buf.readInt8(1);

}

util.inherits(WeaponItem, EquipmentItem);

WeaponItem.prototype.GetName = function()
{
    switch (this.Class)
    {
    case 19:
    case 38:
    case 39:
    case 58:
    case 59:
    default:
        return "Unknown?";
    case 1:
        return "Mutilator";
    case 2:
        return "Starshatter";
    case 3:
        return "Striker";
    case 4:
        return "Exterminator";
    case 5:
        return "Voidblaster";
    case 6:
        return "Ravager";
    case 7:
        return "Brutalizer";
    case 8:
        return "Vaporizer";
    case 9:
        return "Desolator";
    case 10:
        return "Atomizer";
    case 11:
        return "Corruptor";
    case 12:
        return "Mindslayer";
    case 13:
        return "Riftbreaker";
    case 14:
        return "Soultaker";
    case 15:
        return "Nullcannon";
    case 16:
        return "Demolisher";
    case 17:
        return "Incinerator";
    case 18:
        return "Eradicator";
    case 20:
        return "Rapture";
    case 21:
        return "Glory";
    case 22:
        return "Oblivion";
    case 23:
        return "Horror";
    case 24:
        return "Ruin";
    case 25:
        return "Cataclysm";
    case 26:
        return "Torment";
    case 27:
        return "Smolder";
    case 28:
        return "Destruction";
    case 29:
        return "Frenzy";
    case 30:
        return "Silence";
    case 31:
        return "Exodus";
    case 32:
        return "Darkness";
    case 33:
        return "Agony";
    case 34:
        return "Prophecy";
    case 35:
        return "Radiance";
    case 36:
        return "Animus";
    case 37:
        return "Pain";
    case 40:
        return "Screamer";
    case 41:
        return "Succubus";
    case 42:
        return "Banshee";
    case 43:
        return "Basilisk";
    case 44:
        return "Harpy";
    case 45:
        return "Wyvern";
    case 46:
        return "Viper";
    case 47:
        return "Ripper";
    case 48:
        return "Penatrator";
    case 49:
        return "Serpent";
    case 50:
        return "Hydra";
    case 51:
        return "Firecat";
    case 52:
        return "Hellcannon";
    case 53:
        return "Ophidian";
    case 54:
        return "Behemoth";
    case 55:
        return "Gargoyle";
    case 56:
        return "Kraken";
    case 57:
        return "Dragon";
    case 60:
        return "Burst Cannon";
    case 61:
        return "Proton Launcher";
    case 62:
        return "Auto Cannon";
    case 63:
        return "Fusion Beam";
    case 64:
        return "Phaser";
    case 65:
        return "Mass Driver";
    case 66:
        return "Gauss Cannon";
    case 67:
        return "Meson Blaster";
    case 68:
        return "Omega Rifle";
    case 69:
        return "Leviathan";
    case 70:
        return "Accelerator";
    case 71:
        return "Rail Gun";
    case 72:
        return "Disruptor";
    case 73:
        return "Gravity Smasher";
    case 74:
        return "Pulverizer";
    case 75:
        return "Ion Cannon";
    case 76:
        return "Plasma Lance";
    case 77:
        return "Matter Inverter";
    }

}

module.exports = WeaponItem;
