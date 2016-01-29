"use strict";
const Game        = require("./Game.js");
const ChatMessage = require("./commands/ChatMessage.js");
const SetFollow   = require("./commands/SetFollow.js");
const SetAttack   = require("./commands/SetAttack.js");
const RequestJump = require("./commands/RequestJump.js");
const RequestTrade= require("./commands/RequestTrade.js");
const RequestResourceTransfer = require("./commands/RequestResourceTransfer.js");
const RequestCorpAcceptInvite = require("./commands/RequestCorpAcceptInvite.js");


let game = new Game(process.argv[4] || "0000000000000000", process.argv[2], process.argv[3], "66.119.27.230", 31040);

const readline = require('readline');
let timeout = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let follower;

rl.on("line", (line) =>
{

    let args = line.split(" ");

    switch(args[0])
    {

        case "credits":
            console.log(`You have $${game.Credits}`);
            break;

        case "trade":
        {
            switch(args[1])
            {

                case "create":
                {
                    let player;
                    for (let k in game.Players)
                        if (game.Players[k].Name.toLowerCase() == args[2].toLowerCase())
                            player = game.Players[k].ID;

                    let money = parseInt(args[3]);

                    console.log(game.ID, money, player, 0, false);

                    game.Writer.Write(new RequestTrade(game.ID, money, player, 0, false));

                    break;
                }

                case "accept":
                {

                    game.LastTrade.Final = true;

                    game.Writer.Write(game.LastTrade);
                    delete game.LastTrade;

                }

                default:
                    break;
            }

            break;

        }

        case "corp":
        {

            switch(args[1])
            {

                case "accept":
                    game.Writer.Write(new RequestCorpAcceptInvite());
                    break;

                default:
                    console.log(`unknown option ${args[1]}`);
                    break;

            }

            break;

        }

        case "jump":
        {

            setTimeout(() => {
                switch(args[1].toLowerCase())
                {

                    case "up":
                        game.Writer.Write(new RequestJump(3));
                        break;
                    case "down":
                        game.Writer.Write(new RequestJump(4));
                        break;
                    case "earth":
                        game.Writer.Write(new RequestJump(1));
                        break;
                    default:
                        console.log(`unknown jump type '${args[1]}'`);
                        break;
                }
            }, timeout);

            break;
        }

        case "listitems":
        {
            for (let i = 0; i < game.Inventory.length; i++)
                console.log(game.Inventory[i].toString());

            break;

        }

        case "transfer":
        {

            let me;

            for (let k in game.Players)
                if (game.Players[k].Name == game.User)
                    me = game.Players[k];

            setTimeout(() => game.Writer.Write(
                new RequestResourceTransfer(
                    me.Resources[0], me.Resources[1], me.Resources[2],
                    me.Resources[3], me.Resources[4], follower
                )
            ), timeout);

            break;

        }

        case "timeout":
        {

            timeout = parseInt(args[1]);

            break;

        }

        case "follow":
        {

            let player;
            for (var k in game.Players)
                if(game.Players[k].Name.toLowerCase() == args[1])
                    player = game.Players[k].ID;

            if (player)
                setTimeout(() => game.Writer.Write(new SetFollow(player)), timeout);

            else
                console.log(`unknown player '${args[1]}'`)

            break;

        }

        default:
            console.log(`unknown command '${args[0]}'`)
            break;

    }

})
rl.on("close", () => process.exit(0));

let Notification = new ChatMessage("I am a bot. Fear me.", 1, "");

game.on("CorpInvite", (id) => {

    let CorpName = game.GetCorporation(id).Name;

    console.log(`Invited to ${CorpName}`);

})

game.on("Connected", () => {

    setInterval(() => {

        //game.Writer.Write(Notification);

    }, 5000);
})


game.on("IncomingTrade", (command) => {

    let APlayer, BPlayer;
    for (let k in game.Players)
        if (game.Players[k].ID == command.AID)
            APlayer = game.Players[k];
        else if (game.Players[k].ID == command.BID)
            BPlayer = game.Players[k];

    console.log(`IncomingTrade: ${BPlayer.Name} trading ${command.BCredits} to ${APlayer.Name} for ${command.ACredits}`);

    game.LastTrade = command;

});

game.on("FollowerUpdated", (id) => {
    console.log(id);
    follower = id;
})

game.on("AttackEvent", (command) => {
    if (command.AttackerID == follower && command.AttackType >= 0 && command.AttackType <= 3)
    {
        console.log(command.DefenderID);
        setTimeout(() => game.Writer.Write(new SetAttack(command.DefenderID)), timeout / 4);
    }
})

game.on("Message", (command) => {

    let message = "[" + command.Channel + "] " + command.Sound;

    if (command.Receiver)
        message += " => " + command.Receiver;

    if (command.Sound)
        message += ": ";

    message += command.Message;

    console.log(message);

})
