var Commands = class Commands {

    constructor() {
        this.commandsMap = {

            helpCommand: new (require('./commands/HelpCommand.js'))(),

            ip: new (require('./commands/Ip.js'))(),
            roll: new (require('./commands/Roll.js'))(),

            setChannelAdmin: new (require('./commands/channel/ConfigSetChannelAdmin.js'))(),
            showChannelAdmin: new (require('./commands/channel/ConfigShowChannelAdmin.js'))(),
        };
    }

    findByText(commandText) {
        var command;

        for (var key in this.commandsMap) {
            var currentCommand = this.commandsMap[key];
            if (currentCommand.identify(commandText)) {
                command = currentCommand;
                break;
            }
        }

        return command;
    }

    findByName(commandName) {
        var command;

        for (var key in this.commandsMap) {
            var currentCommand = this.commandsMap[key];
            if (key === commandName) {
                command = currentCommand;
                break;
            }
        }

        return command;
    }
};

module.exports = Commands;

