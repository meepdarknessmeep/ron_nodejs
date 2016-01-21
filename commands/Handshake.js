"use strict";

let Handshake = function Handshake(raw)
{

    let ivlength = raw.Buffer.readInt8(0);

    this.IV = raw.Buffer.slice(1, 1 + ivlength);

    this.Version = raw.Buffer.readInt8(1 + ivlength);

}

module.exports = Handshake;
