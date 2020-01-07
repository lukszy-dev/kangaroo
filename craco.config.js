let target = 'web';
if (process.env.REACT_APP_MODE === 'electron') {
  target = 'electron-renderer'
}
console.log(`\ncraco.config.js: setting webpack target to: ${target}\n`);

module.exports = {
    webpack: {
        configure: {
            target: target
        }
    }
};
