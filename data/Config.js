var Config = class Config {

    constructor() {
        this.token = "";
        this.super_admin = [];
        this.channel_admin = {};
        this.print_stack_trace = true;
    }

    static fromJson(json) {
        var config = new Config();

        config.token = json.token;

        config.super_admin = [];
        json.super_admin.forEach(function (admin) {
            config.super_admin.push(admin);
        });

        config.channel_admin = {};
        Object.keys(json.channel_admin).forEach(function (roomName) {
            config.channel_admin[roomName] = json.channel_admin[roomName];
        });

        return config;
    }

    setChannelAdmin(channel, admin) {
        this.channel_admin[channel] = admin;
    }

    static load() {

        try {

            var configJFile = require('path').dirname(require.main.filename) + '/config.json';
            var configJson = require('jsonfile').readFileSync(configJFile)

            return Config.fromJson(configJson);

        } catch (err) {
            console.log("ERROR:", "Unable to load config\n" + err)
            throw err;
        }
    }

    save() {
        var configJFile = require('path').dirname(require.main.filename) + '/config.json';

        require('jsonfile').writeFileSync(
            configJFile,
            this,
            {},
            function (err, obj) {
                console.log(obj)
            }
        )

        console.log(this)
    }

};

module.exports = Config;