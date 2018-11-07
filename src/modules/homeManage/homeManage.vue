<template>
    <div class="test">
        <c-breadcrumb tableTitle="首页管理"></c-breadcrumb> 
        <div class="container">
            <c-search
              @delAll="handleDelAll"
              @addMessage="handleAddMessage"
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
    import { homeColumn } from '@/config/tableColumn'
    import { delMethods } from '@/config/utils'
    import { homeInterfaceRequest } from '@/config/httpRequest'
    export default {
        name: 'homeManage',
        data() {
            const _that = this
            return {
                tableObject: {
                    data: [], // 表格数据
                    column: homeColumn, // 表格头
                    buttons: [ // 操作按钮
                        {
                            text: '编辑',
                            callback: (index, row) => {
                                _that.$router.push({path: '/editHomeMsg', query: {
                                    title: '编辑',
                                    id: row.id
                                }})
                            },
                        },
                        {
                            text: '删除',
                            type: 'danger',
                            callback: (index, row) => {
                                _that.delDialogShow = true
                                _that.delId = row.id
                                _that.delflag = 'single'
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
                languageList: [], // 语言列表
            }
        },
        methods: {
            // 获取用户信息列表
            getData(currentPage) {
                var _that = this
                homeInterfaceRequest.getHomeData({
                    pageNo: currentPage,
                    pageSize: 10
                }).then(res => {
                    if(res.success) {
                        _that.tableObject.data = res.body.list
                        _that.totalPage = res.count
                    }
                })
            },
            // 分页切换
            handleCurrentChange(page) {
                this.currentPage = page
                this.getData(this.currentPage)
            },
            // 新增
            handleAddMessage() {
                this.$router.push({path: '/editHomeMsg', query: {title: '新增'}})
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
                    homeInterfaceRequest.deleteHomeData,
                    {id: this.delId},
                    homeInterfaceRequest.batchDeleteHomeData,
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
