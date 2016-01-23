"use strict";

let AttackEvent = function AttackEvent(raw)
{

    this.AttackerID = raw.Buffer.readInt32BE(0);
    this.DefenderID = raw.Buffer.readInt32BE(4);
    this.Damage     = raw.Buffer.readInt32BE(8);
    this.AttackType = raw.Buffer.readInt8(12);

}


module.exports = AttackEvent;
