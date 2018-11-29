<template>
    <div class="test">
        <c-breadcrumb tableTitle="产品详情管理"></c-breadcrumb> 
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
          :callback="handleSave"
          :form="form"
          :rules="rules"
          @closeDialog="closeDialog"
          :width="600"
        >
            <el-form-item label="语言类型" prop="languageType">
                <el-select v-model="form.languageType" placeholder="请选择语言" @change="languageChange">
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in languageList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品类型" prop="productId">
                <el-select v-model="form.productId" placeholder="请选择类型">
                    <el-option :key="item.id" :label="item.productTitle" :value="item.id" v-for="item in productTypeList"></el-option>
                </el-select>
                <span style="color: red;">(注意：请先选择语言类型！)</span>
            </el-form-item>
            <el-form-item label="产品图片" prop="productPhoto">
                <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="productPhoto" imageName="productPhoto"></c-upload>
            </el-form-item>
            <el-form-item label="产品名称" prop="productName">
                <el-input v-model.trim="form.productName" placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item label="产品链接" prop="productUrl">
                <el-input v-model.trim="form.productUrl" placeholder="请输入产品链接"></el-input>
            </el-form-item>
        </c-dialog>
    </div>
</template>
<script>
    import { productDetialColumn } from '@/config/tableColumn'
    import { delMethods, editTips } from '@/config/utils'
    import { productDetialInterfaceRequest } from '@/config/httpRequest'
    import mixin from '@/mixins/mixin'
    export default {
        name: 'productDetialManage',
        mixins: [mixin],
        data() {
            return {
                tableObject: {
                    data: [], // 表格数据
                    column: productDetialColumn, // 表格头
                    buttons: [ // 操作按钮
                        {
                            text: '编辑',
                            callback: (index, row) => {
                                this.title = '编辑'
                                this.editDialogShow = true
                                this.getSingleData(row.id)
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
                languageList: [], // 语言类型
                title: '', // 编辑 或 新增
                editDialogShow: false,
                form: {},
                rules: {
                    languageType: [
                        { required: true, message: '请选择语言', trigger: 'blur' }
                    ],
                    productId: [
                        { required: true, message: '请选择类型', trigger: 'blur' }
                    ],
                    productPhoto: [
                        { required: true, message: '请选择图片' }
                    ],
                    productName: [
                        { required: true, message: '请输入产品名称', trigger: 'blur' }
                    ],
                    productUrl: [
                        { required: true, message: '请输入产品链接', trigger: 'blur' }
                    ],
                },
                productTypeList: [], // 产品类型
                productPhoto: [],
                productType: new Map([
                    ['1', ['孕产系列']],
                    ['2', ['童装系列']],
                    ['3', ['安防系列']],
                    ['4', ['出行系列']],
                    ['5', ['用品系列']],
                    ['6', ['喂哺系列']],
                    ['7', ['玩教系列']],
                    ['8', ['睡眠系列']],
                    ['default', ['']],
                ])
            }
        },
        methods: {
            // 获取用户信息列表
            getData(currentPage) {
                productDetialInterfaceRequest.getListData({
                    pageNo: currentPage,
                    pageSize: 10
                }).then(res => {
                    if(res.success) {
                        res.body.list.forEach(item => {
                            let action = this.productType.get(item.productId) || this.productType.get('default')
                            item.productId = action[0]
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
            languageChange(languageType) {
                productDetialInterfaceRequest.getProductType({
                    languageType: languageType
                }).then(res => {
                    this.productTypeList = res
                })
            },
            // 获取单条用户信息
            getSingleData(id) {
                productDetialInterfaceRequest.updateData({
                    id: id
                }).then(res => {
                    this.productPhoto.push({
                        url: res.body.kubNavigatHome.productPhoto
                    })
                    this.$set(this.form, 'languageType', res.body.kubNavigatHome.languageType)
                    this.$set(this.form, 'productId', res.body.kubNavigatHome.productId)
                    this.$set(this.form, 'productPhoto', res.body.kubNavigatHome.productPhoto)
                    this.$set(this.form, 'productName', res.body.kubNavigatHome.productName)
                    this.$set(this.form, 'productUrl', res.body.kubNavigatHome.productUrl)
                    this.$set(this.form, 'id', id)
                })
            },
            // 新增
            handleAddMessage() {
                this.title = '新增'
                this.editDialogShow = true
            },
            // 保存
            handleSave() {
                productDetialInterfaceRequest.saveData(this.form).then(res => {
                    // this.$message.success(res.msg)
                    editTips(this.title)
                    if(res.success) {
                        this.productPhoto = []
                        this.editDialogShow = false
                        this.getData(this.currentPage)
                    }
                })
            },
            // 图片上传成功
            uploadSuccess(response, file, fileList, imageName) {
                this.$set(this.form, imageName, response)
            },
            // 移除图片
            uploadRemove(file, fileList, imageName) {
                this.$set(this.form, imageName, [])
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
                    productDetialInterfaceRequest.deleteData,
                    {id: this.delId},
                    productDetialInterfaceRequest.batchDeleteData,
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
                this.productPhoto = []
            },
        },
        created() {
            this.getData(this.currentPage)
        },
    }
</script>
