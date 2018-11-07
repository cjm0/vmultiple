const path = require('path') 


// 获取本地ip
const os = require('os')
const getIp = () => { 
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}


// 多页面路径处理
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const files = glob.sync(path.resolve(__dirname, '../src/pages') + '/*/main.js')
let rewrites = []

const getEntry = () => { // 获取多页面入口文件
    let map = {}
    files.forEach(file => {
        let dirName = path.dirname(file) // main.js 父级文件夹名字
        let fileName = dirName.substring(dirName.lastIndexOf('\/') + 1)
        map[fileName] = file // 生成对应的键值对 

        rewrites.push({from: eval(`/^\\/${fileName}/`), to: `/${fileName}`})
    })
    return map
}

const getHtml = () => { // 生成多页面的 html 文件
    let arr = []

    files.forEach(file => {
        let dirName = path.dirname(file)
        let fileName = dirName.substring(dirName.lastIndexOf('\/') + 1)

        let conf = {
            filename: fileName,
            template: path.resolve(__dirname, '../src/assets/template.html'),
            chunks: [fileName],
            vendorJsName: 'vendor.dll.js', // 给模板引用
        }

        if (process.env.NODE_ENV === 'production') {
            let productionConfig = {
                minify: {
                    removeAttributeQuotes: true, // 清除属性引号
                    removeComments: true,     // 移除注释
                    collapseWhitespace: true, // 清除多余空格
                    minifyJS: true, // 压缩javascript
                },
                hash: true, 
                vendorJsName: 'vendor.dll.js?v1.1', // 给模板引用
                chunksSortMode: 'dependency'  // 对引入的chunk模块进行排序
            }
            conf = {...conf, ...productionConfig} // 合并基础配置和生产环境专属配置
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}

const getFilesName = () => { // 获取多页面文件名字
    let filesName = []
    files.forEach(file => {
        let dirName = path.dirname(file) // main.js 父级文件夹名字
        let fileName = dirName.substring(dirName.lastIndexOf('\/') + 1)

        filesName.push('/' + fileName.split('.')[0])
    })
    return filesName
}


module.exports = {
    base: {
        rootPath: '/',
        fileName: 'dist',
        filePath: 'dist',
    },
    entry: getEntry(), // 多页面入口文件
    html: getHtml(), // 多页面 html
    prerender: getFilesName(), // 预渲染页面文件
    dev: {
        useEslint: true,
        host: getIp(),
        port: 3007,
        historyApiFallback: {
            verbose: true, // 激活日志记录
            disableDotRule: true, // 允许使用点
            rewrites // history 模式路由处理
        },
        proxy: {
            
        }
    }
}
