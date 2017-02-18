/**
 * Created by shenjj on 2017/1/23.
 */
const webpack = require('webpack');
const path = require('path');

//命令行 webpack --minimize 压缩
const minimize = process.argv.indexOf('--minimize') !== -1;

module.exports = {
    // 页面入口文件配置
    entry: path.resolve(__dirname + '/views/App.js'),
    // 入口文件输出配置
    output: {
        path: path.resolve(__dirname + '/output/js'),
        filename: '[name].bundle.js'
    },
    module: {
        // 加载器配置
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    // 其他解决方案配置
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.json'],
    },

    // 插件项
    plugins: minimize ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                },
                output: {
                    comments: false,
                },
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
        ] : []
};