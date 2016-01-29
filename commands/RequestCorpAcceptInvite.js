"use strict";

const CommandTypes = require("../CommandTypes.js");

let RequestCorpAcceptInvite = function()
{

    this.Type = CommandTypes.REQUEST_CORP_ACCEPT_INVITE;

}

RequestCorpAcceptInvite.prototype.CreateBuffer = function()
{
    return new Buffer(0);
}

module.exports = RequestCorpAcceptInvite;
