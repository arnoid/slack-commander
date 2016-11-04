var AbstractCommand = class AbstractCommand {

    constructor(tag, commandRegex, helpCommandName, helpCommandText) {
        this.TAG = tag;
        this.commandRegex = commandRegex;
        this.helpCommandName = helpCommandName;
        this.helpCommandText = helpCommandText;
    }

    adminOnly() {
        return false;
    }

    channelAdminOnly() {
        return false;
    }

    process(message, BOT) {
        throw new Error("process(message, BOT) not implemented");
    }

    identify(commandText) {
        var result;
        if (commandText.match(this.commandRegex)) {
            console.log(this.TAG, "matches message [" + commandText + "]");
            result = true;
        } else {
            console.log(this.TAG, "NOT matches message [" + commandText + "]");
            result = false;
        }

        return result;
    }

};

module.exports = AbstractCommand;