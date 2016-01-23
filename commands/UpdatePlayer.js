"use strict";

let UpdatePlayer = function UpdatePlayer(raw)
{

    let length = raw.Buffer.readInt8(0);
    this.Name = raw.Buffer.toString("utf8", 1, 1 + length);

    this.ID = raw.Buffer.readInt32BE(length + 1);

    this.Access = raw.Buffer.readInt8(length + 5);

}


module.exports = UpdatePlayer;
