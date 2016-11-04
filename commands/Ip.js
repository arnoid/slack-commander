var AbstractCommand = require('./AbstractCommand.js');

var regex = /^ip$/;

var IpCommand = class IpCommand extends AbstractCommand {

    constructor() {
        super("IP:", regex, 'ip', 'Shows ip address of bot');
    }

    adminOnly() {
        return true;
    }

    process(message, BOT) {
        console.log(this.TAG, message);

        BOT.send("> " + require('quick-local-ip').getLocalIP4(), message.channel);
    }

};

module.exports = IpCommand;