const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const babelOptions = () => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
    }
    return opts
}
const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) {
        loaders.push({ loader: 'eslint-loader' })
    }
    return loaders
}
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
        ],

    },
}