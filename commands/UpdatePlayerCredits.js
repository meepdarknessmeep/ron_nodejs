"use strict";

let UpdatePlayerCredits = function UpdatePlayerCredits(raw)
{

    this.Credits = raw.Buffer.readInt32BE(0);

}

module.exports = UpdatePlayerCredits;
