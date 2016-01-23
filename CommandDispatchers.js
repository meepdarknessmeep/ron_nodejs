"use strict";
module.exports = {};

const CommandTypes = require("./CommandTypes.js");
const RequestLogin = require("./commands/RequestLogin.js");

const CreateDispatcher = (id, fn) => module.exports[id] = fn;


CreateDispatcher(CommandTypes.HANDSHAKE, (cmd, game) => {

    game.IV = cmd.IV;
    game.ServerVersion = cmd.Version;

    console.log("Sending login...");

    game.Writer.Write(new RequestLogin(game.User, game.Email, cmd.IV));

    game.emit("Connected");

})

CreateDispatcher(CommandTypes.SET_MAGIC_VALUES, (cmd, game) => { });


CreateDispatcher(CommandTypes.CHAT_MESSAGE, (cmd, game) => { game.emit("Message", cmd); })
CreateDispatcher(CommandTypes.ALIVE, () => {});
CreateDispatcher(CommandTypes.UPDATE_SECTOR, () => {});

CreateDispatcher(CommandTypes.REQUEST_TRADE, (command, game) => game.emit("IncomingTrade", command));

CreateDispatcher(CommandTypes.SET_FOLLOW, (command, game) => game.emit("FollowerUpdated", command.ID));

CreateDispatcher(CommandTypes.UPDATE_PLAYER, (command, game) => game.UpdatePlayer(command));
CreateDispatcher(CommandTypes.UPDATE_CORP_TECH, (command, game) => game.UpdateCorpTech(command));
CreateDispatcher(CommandTypes.ATTACK_EVENT, (command, game) => game.emit("AttackEvent", command));
CreateDispatcher(CommandTypes.CHANGE_MONEY_EVENT, (command, game) => game.ChangeMoneyEvent(command));
CreateDispatcher(CommandTypes.UPDATE_CORPORATION, (command, game) => game.UpdateCorporation(command));
CreateDispatcher(CommandTypes.UPDATE_PLAYER_STATUS, (command, game) => game.UpdatePlayerStatus(command));
CreateDispatcher(CommandTypes.UPDATE_PLAYER_LOCATION, (command, game) => game.UpdatePlayerLocation(command));
