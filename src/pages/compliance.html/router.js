import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    base: '/compliance.html/',
    mode: 'history',
    routes: [
        {
            path: '/(index.html)?',
            component: resolve => require(['./index.vue'], resolve)
        },
    ]
})
