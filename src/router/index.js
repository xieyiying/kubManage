import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/userManage'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/userManage',
                    component: () => import('@/modules/userManage/userManage.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/menuManage',
                    component: () => import('@/modules/menuManage/menuManage.vue'),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/homeManage',
                    component: () => import('@/modules/homeManage/homeManage.vue'),
                    meta: { title: '首页管理' },
                },
                {
                    path: '/kubManage',
                    component: () => import('@/modules/kubManage/kubManage.vue'),
                    meta: { title: '可优比管理' }
                },
                {
                    path: '/editKubMsg',
                    component: () => import('@/modules/kubManage/editKubMsg.vue'),
                    meta: { title: '可优比数据编辑' }
                },
                {
                    path: '/productManage',
                    component: () => import('@/modules/productManage/productManage.vue'),
                    meta: { title: '产品管理' }
                },
                {
                    path: '/editProductMsg',
                    component: () => import('@/modules/productManage/editProductMsg.vue'),
                    meta: { title: '产品数据编辑' }
                },
                {
                    path: '/productDetialManage',
                    component: () => import('@/modules/productManage/productDetialManage/productDetialManage.vue'),
                    meta: { title: '产品详情管理' }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
