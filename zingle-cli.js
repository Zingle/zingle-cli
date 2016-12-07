const Interface = require("./lib/interface");
const State = require("./lib/state");
const parser = require("./lib/parser");

/**
 * @name CLI
 * @augments {Interface}
 * @type {function}
 */

/**
 * Enable POSIX-like short option interface, with attached option values and
 * option strings.
 * @param {Interface} cli
 * @returns {Interface}
 */
function shortopts(cli) {
    cli.bind(/^(-[a-z0-9])(.+)$/i, (state, opt, val) => {
        if (cli.params(opt)) {
            return state.expand([opt, val]);
        } else if (cli.defines(opt)) {
            return state.expand([opt, "-" + val]);
        } else {
            throw new Error(`unrecognized option ${opt}`);
        }
    });

    return cli;
}

/**
 * Enable GNU getopt-like long option interface, with attached option values.
 * @param {Interface} cli
 * @returns {Interface}
 */
function longopts(cli) {
    cli.bind(/^(--[a-z][-a-z0-9]*)=(.*)$/i, (state, opt, val) => {
        return state.expand([opt, val]);
    });

    return cli;
}

/**
 * Create GNU getopt-like command-line interface argument parser.
 * @returns {CLI}
 */
function cli() {
    var cli = new Interface();

    shortopts(cli);
    longopts(cli);

    return parser(cli);
}

module.exports = cli;
module.exports.Interface = Interface;
module.exports.State = State;
module.exports.parser = parser;
module.exports.shortopts = shortopts;
module.exports.longopts = longopts;
