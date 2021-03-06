const fetch = require('node-fetch');

function HtmlWebpackUrlPlugin(options) {
    this.options = options;
}

HtmlWebpackUrlPlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
            console.log(` Reading data from : ${this.options.url}`);
            fetch(this.options.url)
                .then(res => res.text())
                .then((_html) => {
                    htmlPluginData.html = _html;
                    callback(null, htmlPluginData);
                })
                .catch((err) => {
                    console.error(`Check if the url: ${this.options.url} is reachable in your browser`);
                    callback(err);
                });
        });

    });
}

module.exports = HtmlWebpackUrlPlugin;
