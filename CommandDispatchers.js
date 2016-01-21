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

CreateDispatcher(CommandTypes.SET_MAGIC_VALUES, (cmd, game) => {



});


CreateDispatcher(CommandTypes.CHAT_MESSAGE, (cmd) => {

    console.log(cmd);

})
CreateDispatcher(CommandTypes.ALIVE, () => {});
CreateDispatcher(CommandTypes.UPDATE_SECTOR, () => {});
