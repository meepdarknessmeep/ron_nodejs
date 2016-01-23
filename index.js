"use strict";
const Game        = require("./Game.js");
const ChatMessage = require("./commands/ChatMessage.js");
const SetFollow   = require("./commands/SetFollow.js");
const SetAttack   = require("./commands/SetAttack.js");
const RequestJump = require("./commands/RequestJump.js");
const RequestResourceTransfer = require("./commands/RequestResourceTransfer.js");


let game = new Game(process.argv[2], process.argv[3], "66.119.27.230", 31040);

const readline = require('readline');

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

        case "jump":
        {

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

            break;
        }

        case "transfer":
        {

            game.Writer.Write(new RequestResourceTransfer(127,127,127,127,127, follower));

            break;

        }

        case "follow":
        {

            let player;
            for (var k in game.Players)
                if(game.Players[k].Name.toLowerCase() == args[1])
                    player = game.Players[k].ID;

            if (player)
                game.Writer.Write(new SetFollow(player));

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

game.on("Connected", () => {

    setInterval(() => {

        //game.Writer.Write(Notification);

    }, 5000);
})


game.on("IncomingTrade", (command) => {

    console.log(command);

});

game.on("FollowerUpdated", (id) => {
    console.log(id);
    follower = id;
})

game.on("AttackEvent", (command) => {
    if (command.AttackerID == follower && command.AttackType >= 0 && command.AttackType <= 3)
    {
        console.log(command.DefenderID);
        game.Writer.Write(new SetAttack(command.DefenderID));
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
