process.env.NODE_ENV = 'production' // 设置当前环境为生产环境 放在最上面
const config = require('./base.conf.js') // 配置文件
const baseWebpackConfig = require('./webpack.base.js')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
    mode: 'production', // 启用生产模式配置
    output: {
        publicPath: '/', // 资源引用路径前后都有斜杠
    },
    stats: {
        // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
        all: undefined,
        modules: false, // 添加构建模块信息
        children: false, // 添加 children 信息
        colors: true, // `webpack --colors` 等同于
    },
    plugins: [
        new CleanWebpackPlugin(
            [ // 删除匹配的文件
                `${config.base.filePath}/*.html`,  
                `${config.base.filePath}/static`, 
                `${config.base.filePath}/download`, 
                `${config.base.filePath}/rule`, // 删除以上几个复制过来的文件 
                `${config.base.filePath}/js`, 
                `${config.base.filePath}/css`, 
                `${config.base.filePath}/img`, 
                `${config.base.filePath}/fonts`,  
                `${config.base.filePath}/media`,
                `${config.base.filePath}/source`,
                `${config.base.filePath}/public`,
            ], 
            {
                root: path.resolve(__dirname, '../'), // 重置到根路经
                exclude: ['vendor.dll.js', 'vendor.manifest.json'], // 这几个文件不删除
                verbose: false, // 开启在控制台输出信息
                dry: false, // 启用删除文件
            }
        ),
        new CopyWebpackPlugin(
            [ 
                { 
                    from: path.resolve(__dirname, '../src/public/'),
                    to: 'public/',
                },
                { 
                    from: path.resolve(__dirname, '../static/'),
                    to: './',
                }
            ], 
            {
                ignore: [], // 可以用模糊匹配
                copyUnmodified: true, 
                // debug: "debug" // 是否打印复制的详细信息
            }
        ),
        new webpack.DllReferencePlugin({
            manifest: require(`../${config.base.filePath}/js/vendor.manifest.json`),
            context: path.join(__dirname, '..'), // 和dllplugin里面的context一致
        }),
        new MiniCssExtractPlugin({ // 提取css
            filename: 'css/[name]_[contenthash:6].css'
        }),
        new OptimizeCss({ // 压缩提取的css
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true,
        })
    ],
    performance: {
        hints: "warning" // 打包资源超过 250kb 出提示
    }
})
