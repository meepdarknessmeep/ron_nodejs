"use strict";

const CommandTypes = require("../CommandTypes.js");

let ChatMessage = function ChatMessage(raw, channel, recipient)
{
    this.Type = CommandTypes.CHAT_MESSAGE;

    if (typeof channel != "number")
    {

        let Buffer = raw.Buffer;

        let length = Buffer.readInt8(0);
        this.Message = Buffer.toString("utf8", 1, length + 1);
        let offset = length + 1;

        length =  Buffer.readInt8(offset);
        this.Sound = Buffer.toString("utf8", offset + 1, offset + length + 1);

        offset += 1 + length;

        length = Buffer.readInt8(offset);
        this.Receiver = Buffer.toString("utf8", offset + 1, offset + length + 1);

        this.Channel = Buffer.readInt8(offset + length + 1);
    }
    else
    {

        this.Channel = channel;
        this.Message = raw;
        this.Receiver = recipient;
        this.Sound = "";

    }

}

ChatMessage.prototype.CreateBuffer = function()
{

    let buf = new Buffer(1 + this.Message.length + this.Receiver.length + this.Sound.length + 3);

    let offset = 0;

    buf.writeInt8(this.Message.length, offset);
    buf.write(this.Message, offset+1);

    offset += 1 + this.Message.length;

    buf.writeInt8(this.Sound.length, offset)
    buf.write(this.Sound, offset + 1);

    offset += 1 + this.Sound.length;

    buf.writeInt8(this.Receiver.length, offset);
    buf.write(this.Receiver, offset + 1);


    offset += 1 + this.Receiver.length;

    buf.writeInt8(this.Channel, offset);

    return buf;

}

module.exports = ChatMessage;
