var CONFIG = require('./data/Config.js').load();

var BOT;

var slackModule = require('@slack/client');

var WebClient = slackModule.WebClient;
var RtmClient = slackModule.RtmClient;
var RTM_EVENTS = slackModule.RTM_EVENTS;
var CLIENT_EVENTS = slackModule.CLIENT_EVENTS;
var MemoryDataStore = slackModule.MemoryDataStore;

var Commands = require('./commands.js');

var web = new WebClient(CONFIG.token);

var rtm = new RtmClient(CONFIG.token, {
    logLevel: 'debug',
    dataStore: new MemoryDataStore(),
    autoReconnect: true
});

rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
    BOT = rtmStartData;
    BOT.self.inlineName = '<@' + rtmStartData.self.id + '>';

    BOT.COMMANDS = new Commands();
    BOT.DATASTORE = rtm.dataStore;

    BOT.send = function (output, channel) {
        var data = {
            type: "message",
            subtype: "BOT_message",
            channel: channel,
            text: output
        };

        rtm.send(data, function handleMessageSent() {
        });

        console.log("OUTPUT:", output);
    };

    BOT.startTyping = function (channel) {
        var data = {
            type: "typing",
            subtype: "BOT_message",
            channel: channel
        };

        rtm.send(data, function handleMessageSent() {
        });

    };

});

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    console.log('Message:', message);

    if (typeof message.text === 'undefined') {
        //ignore non-text messages
        return;
    }

    if (message.user == BOT.self.name) {
        //ignore messages of bot
        return;
    }

    if (typeof message.subtype !== 'undefined') {
        //ignore undefined messages
        return;
    }

    console.log('Command for BOT received:', message.text);

    message.BOT = BOT;
    message.CONFIG = CONFIG;

    var command = BOT.COMMANDS.findByText(message.text)

    if (typeof command === 'undefined') {

        console.log("[" + message.text + "] cannot be handled")

    } else {

        BOT.startTyping(message.channel);

        try {
            if (command.adminOnly()) {
                if (CONFIG.super_admin.includes(message.user)) {
                    command.process(message, BOT);
                } else {
                    BOT.send("> Command [" + message.text + "] invalid access rights", message.channel);
                }
            } else if (command.channelAdminOnly()) {
                if (CONFIG.channel_admin[message.channel] === message.user) {
                    command.process(message, BOT);
                } else {
                    BOT.send("> Command [" + message.text + "] invalid access rights", message.channel);
                }
            } else {
                command.process(message, BOT);
            }

        } catch (err) {
            BOT.send("> Command [" + message.text + "] failed\n>" + err, message.channel);

            if (CONFIG.print_stack_trace) {
                BOT.send("> Stacktrace [" + err.stack + "]", message.channel);
            }
        }
    }
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
    console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
    console.log('Reaction removed:', reaction);
});
