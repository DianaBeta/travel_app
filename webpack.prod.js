const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },      
    output:{
        libraryTarget: 'var',
        library:'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(scss)$/,
                use: [MiniCssExtractPlugin.loader, {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    // `postcssOptions` is needed for postcss 8.x;
                    // if you use postcss 7.x skip the key
                    postcssOptions: {
                      // postcss plugins, can be exported to postcss.config.js
                      plugins: function () {
                        return [
                          require('autoprefixer')
                        ];
                      }
                }
              }
            },
                {
                  loader: 'sass-loader',
                }],
              },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                  },
                ],
              },
            ]
        },
    plugins: [
       new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}

