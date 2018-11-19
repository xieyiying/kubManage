<template>
    <div class="test">
        <c-breadcrumb tableTitle="联系信息管理"></c-breadcrumb> 
        <div class="container">
            <c-search
              :isAdd="false"
              @delAll="handleDelAll"
            ></c-search>
            <c-table
              :tableObject="tableObject"
              @selectionChange="selectionChange"
            ></c-table>
            <c-pagination
              :totalPage="totalPage"
              @current-change="handleCurrentChange"
            ></c-pagination>
        </div>
        <!-- 删除 -->
        <c-dialog
          title="删除"
          :show.sync="delDialogShow"
          @confirm="handleDelete"
          @closeDialog="closeDialog"
        ></c-dialog>
    </div>
</template>
<script>
    import { contactColumn } from '@/config/tableColumn'
    import { delMethods } from '@/config/utils'
    import { contactInterfaceRequest } from '@/config/httpRequest'
    export default {
        name: 'newsManage',
        data() {
            return {
                tableObject: {
                    data: [], // 表格数据
                    column: contactColumn, // 表格头
                    buttons: [ // 操作按钮
                        {
                            text: '删除',
                            type: 'danger',
                            callback: (index, row) => {
                                this.delDialogShow = true
                                this.delId = row.id
                                this.delflag = 'single'
                            },
                        }
                    ]
                },
                totalPage: 1, // 总页数
                currentPage: 1, // 当前页
                delDialogShow: false, // 删除弹框的显示
                delId: '', // 删除单条的id
                multipSelectId: '', // 批量选择删除的条目id
                delflag: 'single', // 删除单个 / 多个 标志
            }
        },
        methods: {
            // 获取用户信息列表
            getData(currentPage) {
                contactInterfaceRequest.getListData({
                    pageNo: currentPage,
                    pageSize: 10
                }).then(res => {
                    if(res.success) {
                        this.tableObject.data = res.body.list
                        this.totalPage = res.body.count
                    }
                })
            },
            // 分页切换
            handleCurrentChange(page) {
                this.currentPage = page
                this.getData(this.currentPage)
            },
            // 批量选择删除的条目
            selectionChange(multipSelect) {
                this.multipSelectId = multipSelect
            },
            // 批量删除
            handleDelAll() {
                this.delflag = 'multiple'
                this.delDialogShow = true
            },
            // 确认删除
            handleDelete() {
                delMethods(
                    this.delflag,
                    contactInterfaceRequest.deleteData,
                    {id: this.delId},
                    contactInterfaceRequest.batchDeleteData,
                    {ids: this.multipSelectId}
                )
                .then(res => {
                    if(res.success) {
                        this.delDialogShow = false
                        this.getData(this.currentPage)
                    }
                })
            },
            closeDialog() {
                this.delDialogShow = false
            },
        },
        created() {
            this.getData(this.currentPage)
        },
    }
</script>
