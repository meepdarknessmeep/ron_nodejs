"use strict";

const CommandTypes = require("../CommandTypes.js");

let SetFollow = function SetFollow(id)
{

    this.Type = CommandTypes.SET_FOLLOW;

    if ((typeof id) == "number")
        this.ID = id;
    else
        this.ID = id.Buffer.readInt32BE(0);

}

SetFollow.prototype.CreateBuffer = function()
{

    let ret = new Buffer(4);
    ret.writeInt32BE(this.ID, 0);
    return ret;

}

module.exports = SetFollow;
