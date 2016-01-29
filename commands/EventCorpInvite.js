"use strict";

let EventCorpInvite = function EventCorpInvite(raw)
{

    this.CorpID = raw.Buffer.readInt16BE(0);

}

module.exports = EventCorpInvite;
