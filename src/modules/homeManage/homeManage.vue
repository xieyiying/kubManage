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
        <!-- 编辑 或 新增 -->
        <c-dialog
          :title="title"
          :show.sync="editDialogShow"
          :callback="onSubmit"
          :form="form"
          :rules="rules"
          @closeDialog="closeDialog"
          :width="600"
        >
            <el-form-item label="语言类型" prop="languageType">
                <el-select v-model="form.languageType" placeholder="请选择语言">
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in languageList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传图片" prop="homePhoto">
                <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="homePhoto" imageName="homePhoto"></c-upload>
            </el-form-item>
            <el-form-item label="文字">
                <el-input v-model="form.homeConten" placeholder="请输入文字"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="homeMail">
                <el-input v-model="form.homeMail" placeholder="请输入邮箱"></el-input>
            </el-form-item>
        </c-dialog>
    </div>
</template>
<script>
    import { homeColumn } from '@/config/tableColumn'
    import { delMethods, editTips } from '@/config/utils'
    import { homeInterfaceRequest } from '@/config/httpRequest'
    import mixin from '@/mixins/mixin'
    export default {
        name: 'homeManage',
        mixins: [mixin],
        data() {
            let checkEmail = (rule, value, callback) => {
                let emailRegExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                if(value) {
                    if(emailRegExp.test(value) == false) {
                        callback(new Error('请输入正确的邮箱格式！'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            }
            return {
                tableObject: {
                    data: [], // 表格数据
                    column: homeColumn, // 表格头
                    buttons: [ // 操作按钮
                        {
                            text: '编辑',
                            callback: (index, row) => {
                                this.getSingleData(row.id)
                                this.title = '编辑'
                                this.editDialogShow = true
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
                languageList: [], // 语言列表
                title: '',
                editDialogShow: false,
                form: {},
                rules: {
                    languageType: [
                        { required: true, message: '请选择语言', trigger: 'blur' }
                    ],
                    homePhoto: [
                        { required: true, message: '请选择图片' }
                    ],
                    homeMail: [
                        { required: false, validator: checkEmail, trigger: 'blur' }
                    ],
                },
                languageList: [],
                homePhoto: [],
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
                        _that.totalPage = res.body.count
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
                this.editDialogShow = true
                this.title = '新增'
            },
            // 获取单条用户信息
            getSingleData(id) {
                homeInterfaceRequest.updateHomeData({
                    id: id
                }).then(res => {
                    this.homePhoto.push({
                        url: res.body.kubNavigatHome.homePhoto
                    })
                    this.$set(this.form, 'languageType', res.body.kubNavigatHome.languageType)
                    this.$set(this.form, 'homeConten', res.body.kubNavigatHome.homeConten)
                    this.$set(this.form, 'homePhoto', res.body.kubNavigatHome.homePhoto)
                    this.$set(this.form, 'homeMail', res.body.kubNavigatHome.homeMail)
                    this.$set(this.form, 'id', id)
                })
            },
            // 图片上传成功
            uploadSuccess(response, file, fileList, imageName) {
                this.$set(this.form, 'homePhoto', response)
            },
            // 图片移除
            uploadRemove(file, fileList, imageName) {
                this.$set(this.form, imageName, [])
            },
            // 保存
            onSubmit() {
                homeInterfaceRequest.saveHomeData(this.form).then(res => {
                    editTips(this.title)
                    if(res.success) {
                        this.homePhoto = []
                        this.editDialogShow = false
                        this.getData(this.currentPage)
                    }
                })
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
                this.editDialogShow = false
                this.form = {}
                this.homePhoto = []
            },
        },
        created() {
            this.getData(this.currentPage)
        }
    }
</script>
