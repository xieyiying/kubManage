<template>
    <div class="test">
        <c-breadcrumb tableTitle="测试"></c-breadcrumb> 
        <div class="container">
            <c-search
              @delAll="handleDelAll"
              @addMessage="handleAddMessage"></c-search>
            <c-table
              :tableObject="tableObject"
              @selectionChange="selectionChange"
            ></c-table>
            <c-pagination
              :totalPage="totalPage"
              @current-change="handleCurrentChange">
            </c-pagination>
        </div>
        <!-- 删除 -->
        <c-dialog
          title="删除"
          :show.sync="show"
          @confirm="handleDelete"
          @closeDialog="closeDialog"
        ></c-dialog>
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
                <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
        </c-dialog>
    </div>
</template>
<script>
    export default {
        name: 'test',
        data() {
            const _that = this
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
                                _that.editDialogShow = true
                                _that.form.name = row.name
                                _that.form.password = row.address
                                _that.form.id = row.id
                            },
                        },
                        {
                            text: '删除',
                            type: 'danger',
                            callback: (index, row) => {
                                _that.show = true
                                _that.delId = row.id
                            },
                        }
                    ]
                },
                totalPage: 1000,
                show: false,
                delId: '',
                multipSelectId: '',
                title: '',
                editDialogShow: false,
                form: {},
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // 批量选择删除的条目
            selectionChange(multipSelect) {
                this.multipSelectId = multipSelect
                console.log(this.multipSelectId)
            },
            // 批量删除
            handleDelAll() {
                
            },
            // 新增
            handleAddMessage() {
                this.editDialogShow = true
            },
            // 分页切换
            handleCurrentChange(page) {
                console.log(page)
            },
            // 确认删除
            handleDelete() {
                console.log(this.delId)
            },
            handleSave() {
                console.log(this.form)
            },
            closeDialog() {
                this.show = false
                this.editDialogShow = false
                this.form = {}
            }
        }
    }
</script>
