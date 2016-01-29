"use strict";

const EquipmentItem = require("../classes/EquipmentItem.js");

let UpdatePlayerBank = function UpdatePlayerBank(raw)
{

    let buf = raw.Buffer;

    this.Inventory = [];

    let num = buf.readInt8(0);

    buf = buf.slice(1);

    for (let i = 0; i < num; i++)
    {
        let item = new EquipmentItem(buf);
        this.Inventory[i] = item;
        buf = item.BufferLeft;
        delete item.BufferLeft;
    }

}


module.exports = UpdatePlayerBank;
