var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/ReactNPS.js',
    output: {
        path: path.resolve('lib'),
        filename: 'ReactNPS.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}