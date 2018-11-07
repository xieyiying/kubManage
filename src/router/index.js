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
                    // children: [
                    //     {
                    //         path: 'editHomeMsg',
                    //         component: () => import('@/modules/homeManage/editHomeMsg.vue'),
                    //         meta: { title: '首页数据编辑' }
                    //     },
                    // ]
                },
                {
                    path: '/editHomeMsg',
                    component: () => import('@/modules/homeManage/editHomeMsg.vue'),
                    meta: { title: '首页数据编辑' }
                },
                {
                    path: '/menuManage',
                    component: () => import('@/modules/menuManage/menuManage.vue'),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/test',
                    component: resolve => require(['@/modules/test.vue'], resolve),
                    meta: { title: '测试' }
                },
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
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
