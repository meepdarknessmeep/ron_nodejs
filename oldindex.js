"use strict";

let crypto = require("crypto");

const address = "66.119.27.230";
const port = 31040;

const ERON_REQUEST_LOGIN = -73;
const ERON_ALIVE = -125;

const key = new Buffer([2, 39, 117, -2, -2, 8, -67, 53, -9, -110, 88, 93, -42, 63, 24, -39]);

let iv = undefined, version = undefined;

let Encrypt = function(text)
{

    let cipher = crypto.createCipheriv("aes-128-cbc", key, iv);

    return  Buffer.concat([
                cipher.update(text),
                cipher.final()
            ]).toString("hex");

}


let CreateLogin = function(user, email)
{

	const serial = "0000-0000-0000-0001";
	const info = "MICROSOFT WINDOWS 10 USER RONNODEJS";
	const clientversion = "1.2.0-GP";

    let bundles = [];

    // len = 2 + bundles.length * 2 + each(bundles, (v) => return v.length) + user.length

    bundles[0] = Encrypt(email);
    bundles[1] = Encrypt("ron_node_js");
    bundles[2] = Encrypt(serial);
    bundles[3] = Encrypt(info);
    bundles[4] = Encrypt(clientversion);

    let len = 5; // length of size var + id var + bundle length

    for(let i = 0; i < bundles.length; i++)
        len += bundles[i].length / 2;

    len += 2 * bundles.length;
    len += 1;
    len += user.length;

    let login = new Buffer(len);

    login.writeUInt16BE(len - 2, 0);

    login.writeInt8(ERON_REQUEST_LOGIN, 2);
    login.writeInt16BE(bundles.length, 3);
    let offset = 5;

    for (let i = 0; i < bundles.length; i++)
    {

        login.writeInt16BE(bundles[i].length / 2, offset);
        login.write(bundles[i], offset + 2, "hex");
        offset += bundles[i].length / 2 + 2;

    }

    login.writeInt8(user.length, offset);
    login.write(user, offset + 1, "binary");

    return login;

}


var sock = require("net").createConnection(port, address);

sock.once("data", (buf) => {

    console.log("incoming", buf.length, buf);
    console.log("length", buf.readInt16BE(0));
    console.log("id", buf.readInt8(2));

    let length = buf.readInt8(3);
    console.log("length", length);
    iv = buf.slice(4, length+4);

    console.log("iv", iv.length, iv);

    version = buf.readInt8(length+4);

    console.log("version", version);

    let v = CreateLogin("user", "email");

    sock.write(CreateLogin("user", "email"), "binary");

    let ALIVE = new Buffer(3);
    ALIVE.writeInt16BE(1, 0);
    ALIVE.writeInt8(ERON_ALIVE, 2);

    let interval = setInterval(() => {

        sock.write(ALIVE);

    }, 3500);

    sock.on("data", (buf) =>
    {

    });

});
