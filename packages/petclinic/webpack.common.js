const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sassLintPlugin = require('sasslint-webpack-plugin');

var path = require('path');

var buildDir = path.resolve(__dirname, './build/')

console.log("Building " + process.env.npm_package_name + " v" + process.env.npm_package_version + " at " + buildDir);

module.exports = {
  entry: path.resolve(__dirname,"./src/entry.js"),
  output: {
    path: path.resolve(__dirname, './build/dist'),
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              "name": "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { 
              loader: 'css-loader',
               options: { 
                 importLoaders: 1 
                } 
              },
              { 
                loader: 'sass-loader',
                 options: { 
                   importLoaders: 1 
                  } 
                },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
         from: 'src/assets/',
         to: 'assets/',
      },
        {
           from: 'src/fonts/',
           to: 'fonts/',
        },
    ]),
    new ExtractTextPlugin("assets/app.css"),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new sassLintPlugin({
      configFile: '.sass-lint.yml',
      glob: 'src/**/*.s?(a|c)ss',
      quiet: false,
      ignorePlugins: [
         'extract-text-webpack-plugin',
          'html-webpack-plugin' 
      ],
      failOnWarning: false,
      failOnError: true,
      testing: false
    }),
  ]
};
