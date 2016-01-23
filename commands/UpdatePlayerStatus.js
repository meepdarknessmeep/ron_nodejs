"use strict";

let UpdatePlayerStatus = function UpdatePlayerStatus(raw)
{

    this.ID = raw.Buffer.readInt32BE(0);

    this.CorpID = raw.Buffer.readInt16BE(4);

    this.Online = raw.Buffer.readInt8(6) != -128;

    this.CorpRank = raw.Buffer.readInt8(7);

    this.Hardcore = raw.Buffer.readInt8(8) != -128;

}


module.exports = UpdatePlayerStatus;
