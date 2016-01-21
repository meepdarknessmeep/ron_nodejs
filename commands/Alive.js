"use strict";

const CommandTypes = require("../CommandTypes.js");

let Alive = function Alive()
{

    this.Type = CommandTypes.ALIVE;

}

Alive.prototype.CreateBuffer = () => new Buffer('');

module.exports = Alive;
