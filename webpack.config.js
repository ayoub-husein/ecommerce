const path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports =  {
  
    mode: "development", 

    devtool: "eval-cheap-source-map",

    devServer: {
        contentBase: path.join(__dirname, "/dist"),
        port: 1239,
        writeToDisk: true,
        open: true,
    },
  
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        publicPath: "", 
        filename: "main.js"
    },
    
    module: {
     
      rules: [   
       { 
        test: /\.html$/i,
        use: [
              {
                loader: 'html-loader',
                options: {
                minimize: true,
                }
              }
          ],
        },
        { 
          test: /\.css$/i,
          use: [
                 {   
                  loader: MiniCssExtractPlugin.loader,
                    options: {
                    esModule: false,
                    publicPath: '../',
                    },
                 }, 
                 
                 "css-loader"
             ],
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          loader: 'file-loader',
            options: {
              outputPath: "images",
              name: '[name].[ext]',
              },
        },
        {
          test: /\.(svg|eot|woff|woff2|ttf)$/,
            use: [
              {
                loader: "file-loader", 
                options: {
                  name: '[name].[ext]',
                  outputPath: "fonts",
                  esModule: false,
                }
              }
            ]
        },

        {
          test: require.resolve("jquery"),
          loader: "expose-loader",
          options: {
            exposes: ["$", "jQuery"],
          },
        },
      ],
  },

    plugins: [
    
      new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/index.html'
          }),

          new HtmlWebpackPlugin({
            filename: "product.html",
            template: './src/product.html'
          }),
          
      new MiniCssExtractPlugin({
            filename: "css/style.css",
          }),

      new OptimizeCssAssetsPlugin({}),
    ],
} 
