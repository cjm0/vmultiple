# vue多页面模板


## 需求

1. vue2.0 多页面结构     

2. 保持原网址不变  


## 策略

1. 多页面结构，本地开发用 `historyApiFallback.rewrites` 重写地址，确保刷新能找到路由   

2. 保持原网址不变，页面文件夹命名统一以 `.html` 为后缀，如：about.html index.html  

3. 每个页面视情况重新设置标题、关键字、描述，注意标签的语义化  


## 启动项目

```bash
git clone git@github.com:cjm0/vmultiple.git
yarn
yarn dev

部署
yarn start
yarn build
```

## 地址

[vue多页面模板](http://vmultiple.bigqianduan.top)

#### License

[MIT](./License)