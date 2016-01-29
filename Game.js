"use strict";

const EntityTypes   = require("./EntityTypes.js");
const CommandReader = require("./CommandReader.js");
const CommandWriter = require("./CommandWriter.js");
const Parsers       = require("./CommandParsers.js");
const Dispatchers   = require("./CommandDispatchers.js");
const Alive         = require("./commands/Alive.js");
const EventEmitter  = require("events");
const util          = require("util");

let Game = function Game(serial, user, email, address, port)
{

    this.Serial = serial;
    this.User  = user;
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

    this.Corporations = {};
    this.Players      = {};

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

Game.prototype.GetCorporation = function(id)
{
    return this.Corporations[id];
}

Game.prototype.GetPlayer = function(id)
{
    return this.Players[id];
}

Game.prototype.UpdateCorporation = function(command)
{
    let corporation = this.GetCorporation(command.CorpID);

    if (!corporation)
    {
        corporation = { ID: command.CorpID };
        this.Corporations[command.CorpID] = corporation;
    }

    corporation.Name = command.CorpName;
}

Game.prototype.UpdatePlayer = function(command)
{
    let player = this.GetPlayer(command.ID);

    if (!player)
    {
        player = { ID: command.ID };
        this.Players[command.ID] = player;
    }

    player.Name = command.Name;
    player.Access = command.Access;
}

Game.prototype.UpdatePlayerStatus = function(command)
{
    let player = this.GetPlayer(command.ID);

    if (!player)
    {
        player = { ID: command.ID };
        this.Players[command.ID] = player;
    }

    player.CorpID = command.CorpID;
    player.Online = command.Online;
    player.CorpRank = command.CorpRank;
    player.Hardcore = command.Hardcore;
}

Game.prototype.UpdateCorpTech = function(command)
{
    this.GetCorporation(command.CorpID).Techs = command.Techs;
}

Game.prototype.UpdatePlayerLocation = function(command)
{
    let player = this.GetPlayer(command.ID);

    player.Universe = command.Universe;
    if (player.Universe >= 0)
    {
        player.X = command.X;
        player.Y = command.Y;
    }
}

Game.prototype.ChangeMoneyEvent = function(command)
{
    let player = this.GetPlayer(command.ID);

    player.Money = command.Money;
}

Game.prototype.UpdateShipResources = function(command)
{

    let player = this.GetPlayer(command.ID);

    player.Resources = command.Resources;

}

Game.prototype.UpdateEntity = function(command)
{

    if (command.Valid)
    {

        switch(command.Type)
        {

            case EntityTypes.SHIP:
            {

                let player = this.GetPlayer(command.ID);

                player.Resources = command.Resources;

                break;

            }

            default: break;

        }

    }

}

Game.prototype.UpdatePlayerBank = function(command)
{

    this.Inventory = command.Inventory;

}

module.exports = Game;
