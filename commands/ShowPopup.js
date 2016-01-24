"use strict";

let ShowPopup = function ShowPopup(raw)
{

    let size = raw.Buffer.readInt8(0);

    this.Message = raw.Buffer.toString("utf8", 1, size + 1);

}

module.exports = ShowPopup;
