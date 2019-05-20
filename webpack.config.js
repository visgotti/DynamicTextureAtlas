const webpack = require('webpack');
const path = require('path');
module.exports = function() {
    return {
        entry: path.join(__dirname, "src/index.ts"),
        output: {
            path: path.join(__dirname, "dist"),
            filename: "dta.js",
            libraryTarget: "var",
            library: "DTA"
        },
        module: {
            rules: [
                { test: /\.ts$/, loader: "ts-loader" },
            ],
        },
        resolve: {
            extensions: ['.ts']
        }
    }
};