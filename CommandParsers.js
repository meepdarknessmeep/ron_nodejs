"use strict";

module.exports = {};

const CommandTypes = require("./CommandTypes.js");

let CreateParser = (id, Class) =>
{
    module.exports[id] = (raw) => new Class(raw);
}

CreateParser(CommandTypes.HANDSHAKE, require("./commands/Handshake.js"));
CreateParser(CommandTypes.CHAT_MESSAGE, require("./commands/ChatMessage.js"));
CreateParser(CommandTypes.SET_MAGIC_VALUES, require("./commands/SetMagicValues.js"));
CreateParser(CommandTypes.ALIVE, require("./commands/Alive.js"));
CreateParser(CommandTypes.UPDATE_SECTOR, require("./commands/Alive.js"));
