const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.ts',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: [
            {
                directory: path.resolve(__dirname, 'src'),
                publicPath: '/',
            },
            {
                directory: path.resolve(__dirname, 'assets'),
                publicPath: '/assets',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [new TsconfigPathsPlugin({})],
        fallback: {
            path: require.resolve('path-browserify'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
