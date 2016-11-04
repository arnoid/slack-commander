var AbstractCommand = require('../AbstractCommand.js');

var regex = /^channel set admin <@(.*)>$/;

var ConfigSetChannelAdmin = class ConfigSetChannelAdmin extends AbstractCommand {

    constructor() {
        super("CHANNEL SET ADMIN:", regex, 'channel set admin', 'Sets admin for current channel. Ex. \'channel set admin @usename\'');
    }

    adminOnly() {
        return false;
    }

    channelAdminOnly() {
        return true;
    }

    process(message, BOT) {
        console.log(this.TAG, message);

        var channelAdmin = message.text.match(regex)[1];

        message.CONFIG.setChannelAdmin(message.channel, channelAdmin);

        message.CONFIG.save();

        BOT.send("> Channel admin set to <@" + channelAdmin + ">", message.channel);
    }

};

module.exports = ConfigSetChannelAdmin;