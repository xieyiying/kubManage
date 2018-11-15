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
            <el-form-item label="语言类型：" prop="languageType">
                <el-select v-model="form.languageType" placeholder="请选择语言">
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in languageList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="背景类型：" prop="type">
                <el-select v-model="form.type" placeholder="请选择背景类型">
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in backgroundType"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上传文件：" prop="background">
                <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="background" imageName="background"></c-upload>
            </el-form-item>
        </c-dialog>
    </div>
</template>
<script>
    import { backgroundColumn } from '@/config/tableColumn'
    import { delMethods } from '@/config/utils'
    import { backgroundInterfaceRequest } from '@/config/httpRequest'
    import mixin from '@/mixins/mixin'
    export default {
        name: 'backgroundManage',
        mixins: [mixin],
        data() {
            return {
                tableObject: {
                    data: [], // 表格数据
                    column: backgroundColumn, // 表格头
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
                    type: [
                        { required: true, message: '请选择背景类型', trigger: 'blur' }
                    ],
                    background: [
                        { required: true, message: '请选择文件' }
                    ]
                },
                backgroundType: [], // 背景类型
                background: [],
                type: new Map([
                    ["0", ["首页"]],
                    ["1", ["产品"]],
                    ["2", ["资讯"]],
                    ["3", ["联系"]],
                    ["default", [""]],
                ])
            }
        },
        methods: {
            // 获取用户信息列表
            getData(currentPage) {
                var _that = this
                backgroundInterfaceRequest.getListData({
                    pageNo: currentPage,
                    pageSize: 10
                }).then(res => {
                    if(res.success) {
                        res.body.list.forEach(item => {
                            item.background = this.changeListData(item.type, item.background)
                            let action = this.type.get(item.type) || this.type.get('default')
                            item.type = action[0]
                        })
                        _that.tableObject.data = res.body.list
                        _that.totalPage = res.body.count
                    }
                })
            },
            getBackgroundType() {
                backgroundInterfaceRequest.getBackgroundType({}).then(res => {
                    this.backgroundType = res
                })
            },
            changeListData(type, content) {
                if(type == '0') {
                    return '<video src=' + content + ' style="width: 100%; height: 150px;"></video>'
                } else {
                    return '<img src=' + content + ' alt="" style="width: 100%; height: 150px;">'
                }
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
                backgroundInterfaceRequest.updateData({
                    id: id
                }).then(res => {
                    this.background.push({
                        url: res.body.kubNavigatHome.background
                    })
                    this.$set(this.form, 'languageType', res.body.kubNavigatHome.languageType)
                    this.$set(this.form, 'type', res.body.kubNavigatHome.type)
                    this.$set(this.form, 'background', res.body.kubNavigatHome.background)
                    this.$set(this.form, 'id', id)
                })
            },
            // 图片上传成功
            uploadSuccess(response, file, fileList, imageName) {
                this.$set(this.form, imageName, response)
            },
            // 图片移除
            uploadRemove(file, fileList) {

            },
            // 保存
            onSubmit() {
                backgroundInterfaceRequest.saveData(this.form).then(res => {
                    this.$message.success(res.msg)
                    if(res.success) {
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
                    backgroundInterfaceRequest.deleteData,
                    {id: this.delId},
                    backgroundInterfaceRequest.batchDeleteData,
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
                this.background = []
            },
        },
        created() {
            this.getData(this.currentPage)
            this.getBackgroundType()
        }
    }
</script>
