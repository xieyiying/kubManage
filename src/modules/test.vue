<template>
    <div class="test">
        <c-breadcrumb tableTitle="测试"></c-breadcrumb> 
        <div class="container">
            <c-search
              @delAll="handleDelAll"
              @searchItem="handleSearch"></c-search>
            <c-table
              :tableObject="tableObject"
              @selectionChange="selectionChange"
            ></c-table>
            <c-pagination
              :totalPage="totalPage"
              @current-change="handleCurrentChange">
            </c-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'test',
        data() {
            return {
                tableObject: {
                    data: [
                        {
                            id: 1,
                            date: '2018-10-10',
                            name: 'zhangsan',
                            address: '123',
                            image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541159589540&di=b62d6eb0bbfe022ae80f9cba842c521b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F011ed95542cb710000019ae9d9664d.jpg%401280w_1l_2o_100sh.png',
                        },
                        {
                            id: 2,
                            date: '2018-10-10',
                            name: 'lisi',
                            address: '123'
                        },
                        {
                            id: 3,
                            date: '2018-10-10',
                            name: 'wangwu',
                            address: '123'
                        },
                    ],
                    column: [
                        {
                            prop: 'date',
                            label: '日期',
                        },
                        {
                            prop: 'name',
                            label: '姓名',
                        },
                        {
                            prop: 'address',
                            label: '地址',
                        },
                        {
                            prop: 'image',
                            label: '图片',
                            flag: 'image'
                        },
                    ],
                    buttons: [
                        {
                            text: '编辑',
                            type: '',
                            callback: (index, row) => {
                                console.log('编辑', index, row)
                            }
                        },
                        {
                            text: '删除',
                            type: 'danger',
                            callback: (index, row) => {
                                console.log('删除', index, row)
                            }
                        }
                    ]
                },
                totalPage: 1000
            }
        },
        methods: {
            // 批量选择删除的条目
            selectionChange(multipSelect) {
                console.log(multipSelect)
            },
            // 批量删除
            handleDelAll() {

            },
            // 搜索
            handleSearch(val) {
                console.log(val)
            },
            // 分页切换
            handleCurrentChange(page) {
                console.log(page)
            }
        }
    }
</script>
