"use strict";

const EventEmitter = require("events");
const RawCommand   = require("./RawCommand.js");
const util         = require('util');

let CommandReader = function CommandReader(sock)
{

    EventEmitter.call(this);

    this.sock = sock;

    this.Buffer = new Buffer([]);

    let ths = this;

    this.sock.on("data", (buf) => ths.OnData(buf));

}

util.inherits(CommandReader, EventEmitter);

CommandReader.prototype.OnData = function(buf)
{

    this.Buffer = Buffer.concat([
        this.Buffer,
        buf
    ]);

    let command = new RawCommand(this.Buffer);

    while(command.Valid)
    {
        this.Buffer = this.Buffer.slice(command.Length);

        this.emit("NewCommand", command);

        command = new RawCommand(this.Buffer);
    }

}


module.exports = CommandReader;
