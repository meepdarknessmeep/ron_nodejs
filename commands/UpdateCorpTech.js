"use strict";

let UpdateCorpTech = function UpdateCorpTech(raw)
{

    this.CorpID = raw.Buffer.readInt16BE(0);

    this.Techs = [];

    for (let i = 2; i < 20; i++)
        this.Techs[i-2] = raw.Buffer.readInt8(i) != -128;

}


module.exports = UpdateCorpTech;
