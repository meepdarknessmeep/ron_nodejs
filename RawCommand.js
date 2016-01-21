"use strict";

let RawCommand = function RawCommand(buf)
{

    this.Valid = false;

    if (buf.length < 2)
        return;

    let length = buf.readInt16BE(0);

    if(length > buf.length - 2)
        return;

    this.Valid = true;

    this.Buffer = buf.slice(3, length + 2);

    this.Type = buf.readInt8(2);

    this.Length = length + 2;

}

module.exports = RawCommand;
