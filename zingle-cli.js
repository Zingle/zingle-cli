const Interface = require("./lib/interface");

/**
 * @name CLI
 * @augments {Interface}
 * @type {function}
 */

/**
 * Enable POSIX-like short option interface, with attached option values and
 * option strings.
 * @param {CLI} cli
 * @returns {CLI}
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
 * @param {CLI} cli
 * @returns {CLI}
 */
function longopts(cli) {
    cli.bind(/^(--[a-z][-a-z0-9]*)=(.*)$/i, (state, opt, val) => {
        return state.expand([opt, val]);
    });

    return cli;
}

/**
 * Create GNU getopt-like command-line interface.
 * @returns {CLI}
 */
function cli() {
    var cli = new CLI();

    shortopts(cli);
    longopts(cli);

    return cli;
}

module.exports = cli;
module.exports.Interface = Interface;
