"use strict";

let UpdateCorporation = function UpdateCorporation(raw)
{

    let length = raw.Buffer.readInt8(0);
    this.CorpName = raw.Buffer.toString("utf8", 1, 1 + length);

    this.CorpID = raw.Buffer.readInt16BE(1 + length);

}


module.exports = UpdateCorporation;
