"use strict";
const Game        = require("./Game.js");
const ChatMessage = require("./commands/ChatMessage.js");

let game = new Game("user", "email", "66.119.27.230", 31040);

let Notification = new ChatMessage("I am a bot. Fear me.", 1, "");

game.on("Connected", () => {

    setInterval(() => {

        //game.Writer.Write(Notification);

    }, 5000);
})
