let execSync = require('child_process').execSync;

module.exports = argv => {
    execSync(`sh -c "(nohup ${argv.params[0]} >/dev/null 2>&1) &"`);
};