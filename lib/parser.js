const State = require("./state");

/**
 * Create parse function for a command-line interface.
 * @param {Interface} cli
 */
function parser(cli) {
    var parse = cli.parse.bind(cli);

    for (var key in cli) {
        if (typeof cli[key] === "function" && key !== "parse") {
            parse[key] = cli[key].bind(cli);
        }
    }

    return parse;
}
