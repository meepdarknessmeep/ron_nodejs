"use strict";

const CommandTypes = require("../CommandTypes.js");

let RequestTrade = function RequestTrade(raw, money, bid, bcredits, final)
{
    this.Type = CommandTypes.REQUEST_TRADE;

    if (money)
    {

        this.AID = raw;
        this.ACredits = money;
        this.Final = final;
        this.BID = bid;
        this.BCredits = bcredits;
        this.Final = final;
        this.Valid = true;

    }
    else
    {

        this.Valid = false;


        this.AID = raw.Buffer.readInt32BE(0);
        this.BID = raw.Buffer.readInt32BE(4);

        this.ACredits = raw.Buffer.readInt32BE(8);

        console.log(raw.Buffer.readInt8(12));
        if (raw.Buffer.readInt8(12) != -128)
            return;

        this.BCredits = raw.Buffer.readInt32BE(13);

        if (raw.Buffer.readInt8(17) != -128)
            return;

        this.Final = raw.Buffer.readInt8(18) != -128;

        this.Valid = true;

    }

}

RequestTrade.prototype.CreateBuffer = function()
{

    let ret = new Buffer(19);

    ret.writeInt32BE(this.AID, 0);
    ret.writeInt32BE(this.BID, 4);
    ret.writeInt32BE(this.ACredits, 8);
    ret.writeInt8(-128, 12);
    ret.writeInt32BE(this.BCredits, 13);
    ret.writeInt8(-128, 17);
    ret.writeInt8(this.Final ? 127 : -128, 18);

    return ret;

}


module.exports = RequestTrade;
