var AbstractCommand = require('./AbstractCommand.js');
var Roll = require('roll');

var regex = /^roll\s(\d*)d(\d+|\%)(([\+\-\/\*bw])(\d+))?(([\+\-\/\*])(\d+|(\d*)d(\d+|\%)(([\+\-\/\*bw])(\d+))?))*$/;
var rollRegex = /^roll\s((\d*)d(\d+|\%)(([\+\-\/\*bw])(\d+))?(([\+\-\/\*])(\d+|(\d*)d(\d+|\%)(([\+\-\/\*bw])(\d+))?))*)$/;

var RollCommand = class RollCommand extends AbstractCommand {

    constructor() {
        super("ROLL:", regex, 'roll', 'Rolls dice. Ex. \'roll d6\', \'roll d124+4+13d14\'');
    }

    process(message, BOT) {
        console.log(this.TAG, message);

        var dice = message.text.match(rollRegex)[1].trim();

        BOT.send("> " + dice + " = " + new Roll().roll(dice).result, message.channel);
    }

};

module.exports = RollCommand;