"use strict";

const CommandTypes = require("../CommandTypes.js");

let SetAttack = function SetAttack(id)
{

    this.Type = CommandTypes.SET_ATTACK;

    this.ID = id;

}

SetAttack.prototype.CreateBuffer = function()
{
    let ret = new Buffer(4);
    ret.writeInt32BE(this.ID, 0);
    return ret;
}

module.exports = SetAttack;
