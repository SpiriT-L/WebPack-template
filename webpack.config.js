const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// import mainImage from './assets/static/[hash][ext][query]';

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 8080,
          // contentBase: path.join(__dirname, 'public'),
        },
      };

const esLintPlugin = (isDev) => !isDev ? [] : [new ESLintPlugin({ extensions: ['ts', 'js'] })];

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  devtool: develop ? 'inline-source-map' : false,
  entry: {
    app: './src/js/index.ts',
  },
  output: {
    filename: './js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'assets/[name][ext]',
    assetModuleFilename: 'assets/[name][ext][query]',
  },

  // подключение TypeScript
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.png/,
      //   type: 'asset/resource'
      // },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.html/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'static/[hash][ext][query]'
      //   }
      // },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ca]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Hellow',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css',
      // filename: 'style.css',
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "source", to: "dest" },
    //     { from: "other", to: "public" },
    //   ],
    // }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    // new ESLintPlugin({ extensions: ['ts', 'js'] }),
...esLintPlugin(develop),
  ],

  ...devServer(develop),
});
