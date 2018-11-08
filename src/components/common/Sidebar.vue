<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" active-text-color="#8B7355" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-tickets',
                        index: 'userManage',
                        title: '用户管理'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'menuManage',
                        title: '菜单管理'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'homeManage',
                        title: '首页管理'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'kubManage',
                        title: '可优比管理'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'productManage',
                        title: '产品管理',
                        subs: [
                            {
                                index: 'productManage',
                                title: '产品管理'
                            },
                            {
                                index: 'productDetialManage',
                                title: '产品详情管理'
                            },
                        ]
                    },
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .el-menu {
        background: rgba(56, 157, 170, 0.7);
    }
    .el-menu .el-menu-item:hover {
        color: #333;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
