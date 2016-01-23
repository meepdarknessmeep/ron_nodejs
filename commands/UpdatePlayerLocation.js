"use strict";

let UpdatePlayerLocation = function UpdatePlayerLocation(raw)
{

    this.ID = raw.Buffer.readInt32BE(0);
    this.Universe = raw.Buffer.readInt8(4);
    if (this.Universe >= 0)
    {
        this.X = raw.Buffer.readInt8(5);
        this.Y = raw.Buffer.readInt8(6);
    }

}


module.exports = UpdatePlayerLocation;
