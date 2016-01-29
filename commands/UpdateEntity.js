"use strict";

const EntityTypes = require("../EntityTypes.js");

let UpdateEntity = function UpdateEntity(raw)
{

    this.Type = raw.Buffer.readInt8(0);
    this.ID = raw.Buffer.readInt32BE(1);
    this.Valid = false;

    switch(this.Type)
    {


        case EntityTypes.SHIP:
        {

            this.Valid = true;

            this.Hull = raw.Buffer.readInt32BE(5);
            this.CorpID = raw.Buffer.readInt16BE(9);
            this.Class = raw.Buffer.readInt8(11);

            this.Resources = [];

			for (let i = 0; i < 5; i++)
                this.Resources[i] = raw.Buffer.readInt8(12 - i + 4);

            break;

        }

        default: break;

    }

}

module.exports = UpdateEntity;
