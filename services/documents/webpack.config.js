const path = require('path');
var slsw = require('serverless-webpack');

module.exports = {
    target: 'node',
    entry: slsw.lib.entries,
    module: {
        loaders: [{
            test: /\.js$/,
            include: __dirname,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                plugins: ['transform-object-rest-spread']
              }
            }
        }],
    },
    resolve: {
        modules: [path.resolve(__dirname, "node_modules")]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
};
