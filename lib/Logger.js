const generateLog = (lvl, name, msg) => {
  if (typeof msg === 'object') {
    return (`${name}(${lvl}):${JSON.stringify(msg)}`);
  }
  return `${name}(${lvl}):${JSON.stringify(msg)}`;
};
/**
 * opts:{name,verbosity}
 * verbosity must be equal or less than:
 * debug:0
 * info:1
 * warn:2
 * error:3
 */
class Logger {
  constructor(opts) {
    this.name = opts.name || 'busqueda_tesoro';
    this.verbosity = opts.verbosity || 0;
  }

  debug(msg) {
    if (this.verbosity < 1) {
      console.log(generateLog('DEBUG', this.name, msg));
    }
  }
  info(msg) {
    if (this.verbosity < 2) {
      console.log(generateLog('INFO', this.name, msg));
    }
  }
  warn(msg) {
    if (this.verbosity < 3) {
      console.log(generateLog('WARN', this.name, msg));
    }
  }
  error(msg) {
    if (this.verbosity < 4) {
      console.log(generateLog('ERROR', this.name, msg));
    }
  }
}
module.exports = Logger;
