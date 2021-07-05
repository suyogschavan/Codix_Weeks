const path = require('path');
module.exports = {
    entry: './src/scripts.js',
    output: {
        path: path.resolve(__dirname, './public/js/'),
        filename: 'build.js',
    },
    mode: 'development',
    watch: true
};