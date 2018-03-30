//console.log(process.env.NODE_ENV)
let webpack = require('webpack')
let UglifyPlugin = webpack.optimize.UglifyJsPlugin
let DefinePlugin = webpack.DefinePlugin;
let config = {
    entry:{
        "bundle":__dirname + '/src/main.js'
    },
    output:{
        "filename":'[name].js',
        "path":__dirname + '/dist'
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use:['babel-loader']
            },
            {
                test:/\.(css|scss)$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test:/\.(eot|svg|ttf|woff)$/,
                use:['url-loader']
            },
            {
                test:/\.(jpg|gif|png|jpeg)$/,
                use:['url-loader']
            }
        ]
    },
    plugins:[],
    resolve:{
        extensions:['.jsx','.js','.scss']
    }
}
let newConfig = {}
if(process.env.NODE_ENV =='development'){
    config.plugins.push(new DefinePlugin({
        "process.env":'"development"'
    }))
    newConfig = {
        ...config,
        devServer:{
            historyApiFallback:true,
            inline:true,
            open:true,
            port:6060,
            noInfo: true
        },
        devtool:'eval-source-map'
    }
}
if(process.env.NODE_ENV == 'production'){
    config.plugins.push(new UglifyPlugin())
    config.plugins.push(new DefinePlugin({
        "process.env":'"production"'
    }))
    newConfig = {
        ...config
    }
}
module.exports = newConfig;