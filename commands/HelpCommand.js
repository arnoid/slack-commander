var AbstractCommand = require('./AbstractCommand.js');
var LineSplitter = require('../util/LineSplitter.js');

var regex = /^help$/;

var HelpCommand = class HelpCommand extends AbstractCommand {

    constructor() {
        super("HELP COMMANDS:", regex, 'help', 'Shows this help');
    }

    adminOnly() {
        return true;
    }

    process(message, BOT) {
        console.log(this.TAG, message);

        var AsciiTable = require("ascii-table");
        var table = new AsciiTable();

        table.setHeading('Name', 'AdminOnly', 'ChannelAdminOnly', 'Text');

        Object.keys(BOT.COMMANDS.commandsMap).forEach(key => {
            var command = BOT.COMMANDS.commandsMap[key];

            var commandName;
            var commandText;

            if (typeof command.helpCommandName === 'undefined') {
                commandName = key;
            } else {
                commandName = command.helpCommandName;
            }

            if (typeof command.helpCommandText === 'undefined') {
                commandText = "";
            } else {
                commandText = command.helpCommandText;
            }

            LineSplitter.split(commandText).forEach((line, index) => {
                if (index === 0) {
                    table.addRow(commandName, command.adminOnly(), command.channelAdminOnly(), line);
                } else {
                    table.addRow('', '', '', line);
                }
            });

        });

        BOT.send("```" + table.toString() + "```", message.channel);
    }

};

module.exports = HelpCommand;