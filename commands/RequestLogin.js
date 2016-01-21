"use strict";

const CommandTypes = require("../CommandTypes.js");
const crypto       = require("crypto");

const key = new Buffer([2, 39, 117, -2, -2, 8, -67, 53, -9, -110, 88, 93, -42, 63, 24, -39]);

let RequestLogin = function RequestLogin(user, email, iv)
{

    this.Type = CommandTypes.REQUEST_LOGIN;

    this.IV = iv;
    this.User = user;
    this.Email = email;

}

RequestLogin.prototype.Encrypt = function(text)
{
    let cipher = crypto.createCipheriv("aes-128-cbc", key, this.IV);

    return Buffer.concat([
               cipher.update(text),
               cipher.final()
           ]).toString("hex");
}

RequestLogin.prototype.CreateBuffer = function()
{

	const serial = "0000-0000-0000-0001";
	const info = "MICROSOFT WINDOWS 10 USER RONNODEJS";
	const clientversion = "1.2.0-GP";

    let bundles = [];

    bundles[0] = this.Encrypt(this.Email);
    bundles[1] = this.Encrypt("ron_node_js");
    bundles[2] = this.Encrypt(serial);
    bundles[3] = this.Encrypt(info);
    bundles[4] = this.Encrypt(clientversion);

    let len = 2; // bundle length

    for(let i = 0; i < bundles.length; i++)
        len += bundles[i].length / 2; // divide by 2 since hex

    len += 2 * bundles.length;
    len += 1;
    len += this.User.length;

    let ret = new Buffer(len);

    ret.writeInt16BE(bundles.length, 0);

    let offset = 2;

    for (let i = 0; i < bundles.length; i++)
    {
        ret.writeInt16BE(bundles[i].length / 2, offset);
        ret.write(bundles[i], offset + 2, "hex");
        offset += bundles[i].length / 2 + 2;
    }

    ret.writeInt8(this.User.length, offset);
    ret.write(this.User, offset + 1, "binary");

    return ret;

}

module.exports = RequestLogin;
