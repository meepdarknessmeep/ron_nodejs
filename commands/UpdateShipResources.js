"use strict";

let UpdateShipResources = function UpdateShipResources(raw)
{

    this.ID = raw.Buffer.readInt32BE(0);

    this.Resources = [];

    for (let i = 0; i < 5; i++)
        this.Resources[i] = raw.Buffer.readInt8(4 - i + 4);

}

module.exports = UpdateShipResources;
