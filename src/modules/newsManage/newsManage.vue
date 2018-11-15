<template>
    <div class="test">
        <c-breadcrumb tableTitle="产品管理"></c-breadcrumb> 
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
    import { newsColumn } from '@/config/tableColumn'
    import { delMethods } from '@/config/utils'
    import { newsInterfaceRequest } from '@/config/httpRequest'
    export default {
        name: 'newsManage',
        data() {
            return {
                tableObject: {
                    data: [], // 表格数据
                    column: newsColumn, // 表格头
                    buttons: [ // 操作按钮
                        {
                            text: '编辑',
                            callback: (index, row) => {
                                this.$router.push({path: '/editNewsMsg', query: {
                                    id: row.id,
                                    title: '编辑'
                                }})
                            },
                        },
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
                newsType: new Map([
                    ["0", ["可优比新闻"]],
                    ["1", ["婴儿床小百科"]],
                    ["2", ["床垫小百科"]],
                    ["3", ["睡眠小百科"]],
                    ["default", [""]],
                ])
            }
        },
        methods: {
            // 获取用户信息列表
            getData(currentPage) {
                newsInterfaceRequest.getListData({
                    pageNo: currentPage,
                    pageSize: 10
                }).then(res => {
                    if(res.success) {
                        res.body.list.forEach(item => {
                            let action = this.newsType.get(item.newsType) || this.newsType.get('default')
                            item.newsType = action[0]
                            switch(item.isPublish) {
                                case "0":  item.isPublish = "未发布"; break;
                                case "1":  item.isPublish = "发布"; break;
                                default :  break;
                            }
                        })
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
            // 新增
            handleAddMessage() {
                this.$router.push({path: '/editNewsMsg', query: {title: '新增'}})
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
                    newsInterfaceRequest.deleteData,
                    {id: this.delId},
                    newsInterfaceRequest.batchDeleteData,
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
        activated() {
            this.getData(this.currentPage)
        }
    }
</script>
