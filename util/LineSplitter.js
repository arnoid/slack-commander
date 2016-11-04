const lineBreakRegex = /([^\n]{1,})/g;

var LineSplitter = class LineSplitter {

    constructor() {

    }

    static split(line) {
        var result = [];
        var match = line.match(lineBreakRegex);
        if (match.length > 0) {
            match.forEach((splitLine) => {
                result.push(splitLine);
            });
        } else {
            result.push(line);
        }

        return result;
    }

};

module.exports = LineSplitter;