import Vue from 'vue'
import axios from 'axios'
import jsonp from '@/assets/jsonp.js'

import '@/assets/common.js'
import components from '@/components/index.js'


document.setTitle = function(title) {
    document.title = `${title}-` + document.title
    document.getElementById('keywords').content = document.getElementById("keywords").content + `,${title}`
}


// 全局引入组件
Object.keys(components).forEach(key => Vue.component(key, components[key]))




// 定义全局公用ajax
Object.defineProperty(Vue.prototype, 'axios', {value: axios})
Object.defineProperty(Vue.prototype, '$jsonp', {value: jsonp})
axios.defaults.withCredentials = true // 是否携带cookie信息

axios.interceptors.request.use(res => { // 添加请求拦截器
    return res;
}, err => {
    return Promise.reject(err);
})
axios.interceptors.response.use(res => { // 添加响应拦截器 
    return res.data
}, err => {
    Promise.reject(err)
})
axios.defaults.transformRequest = [function (data) { // 用于请求之前对请求数据进行操作
    var ret = []
    for (var it in data) {
        ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
    }
    return ret.join('&')
}]







