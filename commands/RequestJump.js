"use strict";

const CommandTypes = require("../CommandTypes.js");

let RequestJump = function RequestJump(type)
{

    this.Type = CommandTypes.REQUEST_JUMP;

    this.JumpType = type;

}

RequestJump.prototype.CreateBuffer = function()
{

    let buf = new Buffer(1);
    buf.writeInt8(this.JumpType);
    return buf;

}

module.exports = RequestJump;
