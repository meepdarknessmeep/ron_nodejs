"use strict";

let SetMagicValues = function SetMagicValues(rawcommand)
{

    this.AuctionFee        = rawcommand.Buffer.readInt32BE(0);
    this.MaxItemRank       = rawcommand.Buffer.readInt32BE(4);
    this.HullRepairSpeedMS = rawcommand.Buffer.readInt32BE(8);
    this.HullRepairBase    = rawcommand.Buffer.readInt32BE(12);
    this.HullBase          = rawcommand.Buffer.readInt32BE(16);
    this.MoveSpeedBase     = rawcommand.Buffer.readInt32BE(20);
    this.NpcHullMod        = rawcommand.Buffer.readFloatBE(24);
    this.DailySpecial      = rawcommand.Buffer.readInt8(28);

}

module.exports = SetMagicValues;
