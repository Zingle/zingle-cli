const values = require("./values");
const param = values.params;
const rest = values.rest;
const done = values.done;

const options$priv = Symbol("Interface.options");
const patterns$priv = Symbol("Interface.patterns");
const handlers$priv = Symbol("Interface.handlers");
const param$priv = Symbol("Interface.param");
const rest$priv = Symbol("Interface.rest");
const done$priv = Symbol("Interface.done");

/**
 * Command-line interface definition.
 * @constructor
 */
function Interface() {
    this[options$priv] = new Map();
    this[patterns$priv] = new Map();
    this[handlers$priv] = new Map();
}

Interface.prototype[options$priv] = null;
Interface.prototype[patterns$priv] = null;
Interface.prototype[handlers$priv] = null;
Interface.prototype[param$priv] = null;
Interface.prototype[rest$priv] = null;
Interface.prototype[done$priv] = null;

/**
 * Bind interface to a handler.
 * @param {string|string[]|param|rest|done} rule
 * @param {function} handler
 * @returns {symbol}
 */
Interface.prototype.bind = function(rule, handler) {
    var key = Symbol(), sym;

    if (typeof rule === "string") rule = [rule];

    switch (rule) {
        case param: sym = param$priv;
        case rest:  sym = sym || rest$priv;
        case done:  sym = sym || done$priv;
            if (sym in this) {
                throw new Error(`cannot rebind ${rule}`);
            }
            this[sym] = key;
            break;
        default:
        if (rule instanceof Array) {
            rule.forEach(rule => {
                if (this[options$priv].has(rule)) {
                    throw new Error(`cannot rebind ${rule}`);
                }
                this[options$priv].set(rule, key);
            });
        } else if (rule instanceof RegExp) {
            if (this[patterns$priv].has(rule)) {
                throw new Error(`cannot rebind ${rule}`);
            }
            this[patterns$priv].set(rule, key);
        } else {
            throw new Error(`invalid rule ${rule}`);
        }
    }

    this[handlers$priv].set(key, handler);
    return key;
};

module.exports = Interface;
