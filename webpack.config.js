module.exports = {
    entry: './source/src/game.js',
    output: {
        path: __dirname,
        filename: 'bin/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    node: {
        fs: "empty",
        child_process: "empty"
    }
}