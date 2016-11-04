var AbstractCommand = require('../AbstractCommand.js');

var regex = /^channel show admin$/;

var ConfigShowChannelAdmin = class ConfigShowChannelAdmin extends AbstractCommand {

    constructor() {
        super("CHANNEL SHOW ADMIN:", regex,'channel show admin', 'Shows admin for current channel');
    }

    adminOnly() {
        return false;
    }

    channelAdminOnly() {
        return false;
    }

    process(message, BOT) {
        console.log(this.TAG, message);

        var channelAdmin = message.CONFIG.channel_admin[message.channel];
        if (typeof channelAdmin === "undefined") {
            BOT.send("> Channel admin is unknown", message.channel);
        } else {
            BOT.send("> Channel admin is <@" + channelAdmin + ">", message.channel);
        }

    }

};

module.exports = ConfigShowChannelAdmin;