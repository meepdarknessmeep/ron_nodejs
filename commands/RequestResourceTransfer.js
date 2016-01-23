"use strict";

const CommandTypes = require("../CommandTypes.js");

let RequestResourceTransfer = function RequestResourceTransfer(
    orgs, gas, metals, radioactives, darkmatter, targetid
)
{

    this.Type = CommandTypes.REQUEST_RESOURCE_TRANSFER;

    this.Resources = [ orgs, gas, metals, radioactives, darkmatter ];
    this.ID = targetid;

}

RequestResourceTransfer.prototype.CreateBuffer = function()
{

    let buf = new Buffer(9);

    for (let i = 0; i < this.Resources.Length; i++)
        buf.writeInt8(this.Resources.Length[i], i);

    buf.writeInt32BE(this.ID, 5);

    return buf;

}

module.exports = RequestResourceTransfer;
