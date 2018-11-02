<template>
    <div class="test">
        <c-breadcrumb tableTitle="用户管理"></c-breadcrumb> 
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
                    data: [],
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
