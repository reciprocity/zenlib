const path = require('path');

module.exports = async ({ config }) => {
    config.resolve.alias['bootstrap-vue'] = path.dirname(__dirname) + '/node_modules/bootstrap-vue';
    return config;
};