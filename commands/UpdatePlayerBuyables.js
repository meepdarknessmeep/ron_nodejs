"use strict";

let UpdatePlayerBuyables = function UpdatePlayerBuyables(raw)
{

    this.Buyables = raw.Buffer.readInt8(0);

}

module.exports = UpdatePlayerBuyables;
