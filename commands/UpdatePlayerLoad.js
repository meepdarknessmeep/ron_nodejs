"use strict";

let UpdatePlayerLoad = function UpdatePlayerLoad(raw)
{

    this.ID = raw.Buffer.readInt32BE(0);

}

module.exports = UpdatePlayerLoad;
