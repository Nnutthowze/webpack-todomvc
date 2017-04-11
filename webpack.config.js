const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
    return {
        context: path.resolve('src'), // the base directory, an absolute path, for resolving entry points and loaders from configuration
        entry: './app.js', // the point or points to enter the application
        output: {
            path: path.resolve('dist'), // where to save bundle
            filename: 'bundle.js', // bundle name
            publicPath: '/src/', // for path that I can use in HTML <script src="/src/bundle.js"></script>
            pathinfo: !env.prod, // tell webpack to include comments in bundles with information about the contained modules
        },
        module: { 
            rules: [
                { 
                    test: /\.js$/, 
                    loader: 'babel-loader', 
                    include: path.resolve('src'),
                    options: { 
                        presets: [['es2015', { module: false }], 'es2016', 'stage-2'], 
                    }
                },
                {
                    test: /\.scss$/,
                    include: path.resolve('styles'),
                    use: ExtractTextPlugin.extract({ 
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    // modules: true, => for react
                                    importLoaders: true,
                                    // localIdentName: "[name]__[local]___[hash:base64:5]" => for react
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: function () {
                                        return [
                                            require('autoprefixer')
                                        ];
                                    }
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                        ],
                    }),
                },
            ],
        },
        plugins: [
            new ExtractTextPlugin('/css/styles.css'),
        ],
        devtool: env.prod ? 'source-map' : 'eval', // source-maps for prod and dev
    }
}