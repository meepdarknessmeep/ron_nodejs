"use strict";

let CommandWriter = function CommandWriter(sock)
{

    this.sock = sock;

}

CommandWriter.prototype.Write = function(command)
{
    let body = command.CreateBuffer();

    let header = new Buffer(3);

    header.writeInt16BE(body.length + 1, 0);
    header.writeInt8(command.Type, 2);

    this.sock.write(Buffer.concat([
        header,
        body
    ]), "binary");

}

module.exports = CommandWriter;
