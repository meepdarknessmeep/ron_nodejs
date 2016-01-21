"use strict";

const CommandReader = require("./CommandReader.js");
const CommandWriter = require("./CommandWriter.js");
const Parsers       = require("./CommandParsers.js");
const Dispatchers   = require("./CommandDispatchers.js");
const Alive         = require("./commands/Alive.js");
const EventEmitter  = require("events");
const util          = require("util");

let Game = function Game(user, email, address, port)
{

    this.User = user;
    this.Email = email;

    this.sock = require("net").createConnection(port, address);

    EventEmitter.call(this);

    this.Reader = new CommandReader(this.sock);
    this.Writer = new CommandWriter(this.sock);

    let ths = this;
    this.Reader.on("NewCommand", (command) => ths.NewCommand(command));

    this.on("Connected", () => {
        ths.AliveHandle = setInterval(() => {

            ths.Writer.Write(new Alive());

        }, 2500)
    });

}

util.inherits(Game, EventEmitter);

Game.prototype.NewCommand = function(rawcommand)
{

    if (!Parsers[rawcommand.Type])
    {
        console.log("Parser for command not found, id " + rawcommand.Type);
        return;
    }

    let command = Parsers[rawcommand.Type](rawcommand);

    if (!command)
    {
        console.log("Parser for command returned falsey type, id " + rawcommand.Type);
        return;
    }

    if (!Dispatchers[rawcommand.Type])
    {
        console.log("Dispatcher for command not found, id " + rawcommand.Type);
        return;
    }

    Dispatchers[rawcommand.Type](command, this);

}

module.exports = Game;
