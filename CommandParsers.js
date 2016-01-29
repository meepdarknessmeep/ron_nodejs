"use strict";

module.exports = {};

const CommandTypes = require("./CommandTypes.js");

let CreateParser = (id, Class) =>
{ module.exports[id] = (raw) => new Class(raw); }

CreateParser(CommandTypes.ALIVE, require("./commands/Alive.js"));
CreateParser(CommandTypes.UPDATE_SECTOR, require("./commands/Alive.js"));
CreateParser(CommandTypes.HANDSHAKE, require("./commands/Handshake.js"));
CreateParser(CommandTypes.SET_FOLLOW, require("./commands/SetFollow.js"));
CreateParser(CommandTypes.SHOW_POPUP, require("./commands/ShowPopup.js"));
CreateParser(CommandTypes.ATTACK_EVENT, require("./commands/AttackEvent.js"));
CreateParser(CommandTypes.CHAT_MESSAGE, require("./commands/ChatMessage.js"));
CreateParser(CommandTypes.UPDATE_ENTITY, require("./commands/UpdateEntity.js"));
CreateParser(CommandTypes.REQUEST_TRADE, require("./commands/RequestTrade.js"));
CreateParser(CommandTypes.UPDATE_PLAYER, require("./commands/UpdatePlayer.js"));
CreateParser(CommandTypes.SET_MAGIC_VALUES, require("./commands/SetMagicValues.js"));
CreateParser(CommandTypes.UPDATE_CORP_TECH, require("./commands/UpdateCorpTech.js"));
CreateParser(CommandTypes.EVENT_CORP_INVITE, require("./commands/EventCorpInvite.js"));
CreateParser(CommandTypes.CHANGE_MONEY_EVENT, require("./commands/ChangeMoneyEvent.js"));
CreateParser(CommandTypes.UPDATE_PLAYER_BANK, require("./commands/UpdatePlayerBank.js"));
CreateParser(CommandTypes.UPDATE_PLAYER_LOAD, require("./commands/UpdatePlayerLoad.js"));
CreateParser(CommandTypes.UPDATE_CORPORATION, require("./commands/UpdateCorporation.js"));
CreateParser(CommandTypes.UPDATE_PLAYER_STATUS, require("./commands/UpdatePlayerStatus.js"));
CreateParser(CommandTypes.UPDATE_PLAYER_CREDITS, require("./commands/UpdatePlayerCredits.js"));
CreateParser(CommandTypes.UPDATE_SHIP_RESOURCES, require("./commands/UpdateShipResources.js"));
CreateParser(CommandTypes.UPDATE_PLAYER_BUYABLES, require("./commands/UpdatePlayerBuyables.js"));
CreateParser(CommandTypes.UPDATE_PLAYER_LOCATION, require("./commands/UpdatePlayerLocation.js"));
