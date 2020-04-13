const path = require('path');
var slsw = require('serverless-webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    entry: slsw.lib.entries,
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: [
                        require('babel-plugin-transform-runtime'),
                        require('babel-plugin-transform-object-rest-spread')
                    ]
                }
            },
            exclude: /node_modules/,
        }]
    },
    externals: [nodeExternals()],
    resolve: {
        modules: [path.resolve(__dirname, "node_modules")]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
};
