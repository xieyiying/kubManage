<template>
    <div class="test">
        <c-breadcrumb tableTitle="用户管理"></c-breadcrumb> 
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
        <!--添加 或 修改 弹框 -->
        <c-dialog
          :title="title"
          :show.sync="editDialogShow"
          :width="400"
          :callback="handleSave"
          :form="form"
          :rules="rules"
          @closeDialog="closeDialog"
        >
            <el-form-item label="用户名：" prop="name">
                <el-input v-model.trim="form.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model.trim="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
        </c-dialog>
    </div>
</template>
<script>
    import { userColumn } from '@/config/tableColumn'
    import { delMethods, editTips } from '@/config/utils'
    import { getUserList, updateUserMsg, saveUserMsg, deleteUserMsg, batchDeleteUserMsg } from '@/config/httpRequest'
    export default {
        name: 'userManage',
        data() {
            let checkUserMsg = (rule, value, callback) => {
                let regExp = /^\S+$/
                if(value) {
                    if(regExp.test(value) == false) {
                        callback(new Error('不能包含空格！'))
                    } else {
                        callback()
                    }
                } else {
                    callback(new Error('请输入信息！'))
                }
            }
            return {
                username: localStorage.getItem('username'),
                tableObject: {
                    data: [], // 表格数据
                    column: userColumn, // 表格头
                    buttons: [ // 操作按钮
                        {
                            text: '编辑',
                            callback: (index, row) => {
                                // let username = localStorage.getItem('username')
                                let rowName = row.name
                                if(this.username === rowName) {
                                    this.editDialogShow = true
                                    this.getSingleUser(row.id)
                                    this.title = '编辑'
                                } else {
                                    this.$message.error('你没有没有权限操作该用户信息！')
                                }
                            },
                        },
                        {
                            text: '删除',
                            type: 'danger',
                            callback: (index, row) => {
                                let rowName = row.name
                                if(this.username === rowName) {
                                    this.delDialogShow = true
                                    this.delId = row.id
                                    this.delflag = 'single'
                                } else {
                                    this.$message.error('你没有没有权限操作该用户信息！')
                                }
                            },
                        }
                    ]
                },
                totalPage: 1, // 总页数
                currentPage: 1, // 当前页
                delDialogShow: false, // 删除弹框的显示
                delId: '', // 删除单条的id
                multipSelectId: '', // 批量选择删除的条目id
                delflag: 'single',
                editDialogShow: false,
                title: '',
                form: {},
                rules: {
                    name: [
                        { required: true, validator: checkUserMsg, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: checkUserMsg, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // 获取用户信息列表
            getUserData(currentPage) {
                getUserList({
                    pageNo: currentPage,
                    pageSize: 10
                }).then(res => {
                    if(res.success) {
                        this.tableObject.data = res.body.list
                        this.totalPage = res.body.count
                    }
                })
            },
            // 获取单条用户信息
            getSingleUser(id) {
                updateUserMsg({
                    id: id
                }).then(res => {
                    this.$set(this.form, 'name', res.body.kubProductInfo.name)
                    this.$set(this.form, 'password', res.body.kubProductInfo.password)
                    this.$set(this.form, 'id', id)
                })
            },
            // 分页切换
            handleCurrentChange(page) {
                this.currentPage = page
                this.getUserData(this.currentPage)
            },
            // 新增
            handleAddMessage() {
                this.title = '新增'
                this.editDialogShow = true
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
                    deleteUserMsg,
                    {id: this.delId},
                    batchDeleteUserMsg,
                    {ids: this.multipSelectId}
                )
                .then(res => {
                    if(res.success) {
                        this.delDialogShow = false
                        this.getUserData(this.currentPage)
                    }
                })
            },
            // 保存
            handleSave() {
                saveUserMsg(this.form).then(res => {
                    // this.$message.success(res.msg)
                    editTips(this.title)
                    if(res.success) {
                        this.editDialogShow = false
                        this.form = {}
                        this.getUserData(this.currentPage)
                    }
                })
            },
            closeDialog() {
                this.delDialogShow = false
                this.editDialogShow = false
                this.form = {}
            },
        },
        created() {
            this.getUserData(this.currentPage)
        }
    }
</script>
