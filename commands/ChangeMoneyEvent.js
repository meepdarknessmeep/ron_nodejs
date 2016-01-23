"use strict";

let ChangeMoneyEvent = function ChangeMoneyEvent(raw)
{

    this.ID = raw.Buffer.readInt32BE(0);
    this.Money = raw.Buffer.readInt32BE(4);

}


module.exports = ChangeMoneyEvent;
