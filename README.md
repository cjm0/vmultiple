# 金蛋理财官网改版项目


## 项目背景

1. [金蛋理财官网地址](https://www.jindanlicai.com)  

2. 原 `git` 地址：`git@192.168.100.119:fe-project/www.jindanlicai.com.git`   

3. 原网站基于 `gulp` 编译 `jade` 文件生成静态 `html`，需要改造成基于 `webpack` 编译的 `vue` 项目  


## 项目准备

### 需求

1. vue2.0 多页面结构     

2. 保持原网址不变  

3. 考虑 seo 的优化  


### 策略

1. 多页面结构，本地开发用 `historyApiFallback.rewrites` 重写地址，确保刷新能找到路由   

2. 保持原网址不变，页面文件夹命名统一以 `.html` 为后缀，如：about.html index.html  

3. 每个页面视情况重新设置标题、关键字、描述，注意标签的语义化  

4. 引入


## 启动项目

放在 xw_fe 目录下

```bash
git clone git@192.168.100.119:xw-fe/xw_fe.git
cnpm i 
yarn dev

部署
yarn start
yarn build
```

## 注意

预渲染插件安装不上用下面的命令

`cnpm install prerender-spa-plugin -D`

