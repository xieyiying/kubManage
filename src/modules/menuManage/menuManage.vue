<template>
    <div class="test">
        <c-breadcrumb tableTitle="菜单管理"></c-breadcrumb> 
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
            <el-form-item label="语言类型" prop="languageType">
                <el-select v-model="form.languageType" placeholder="请选择语言">
                    <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in languageList"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
            </el-form-item>
            <el-form-item label="菜单名：" prop="name">
                <el-input v-model="form.name" placeholder="请输入菜单名"></el-input>
            </el-form-item>
        </c-dialog>
    </div>
</template>
<script>
    import { menuColumn } from '@/config/tableColumn'
    import { delMethods } from '@/config/utils'
    import mixin from '@/mixins/mixin'
    import { getMenuListData, getMenuSortData, updateMenuData, saveMenuData, deleteMenuData, batchDeleteMenuData } from '@/config/httpRequest'
    export default {
        name: 'menuManage',
        mixins: [mixin],
        data() {
            const _that = this
            return {
                tableObject: {
                    data: [], // 表格数据
                    column: menuColumn, // 表格头
                    buttons: [ // 操作按钮
                        {
                            text: '编辑',
                            callback: (index, row) => {
                                _that.editDialogShow = true
                                _that.getSingleData(row.id)
                                _that.title = '编辑'
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
                editDialogShow: false, // 编辑 / 新增 弹框的显示
                title: '', // 编辑 / 新增 弹框标题
                form: {}, // 表单数据
                rules: {  // 表单验证规则
                    languageType: [
                        { required: true, message: '请选择语言', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, message: '请输入排序', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入菜单名', trigger: 'blur' }
                    ]
                },
                languageList: [], // 语言列表
            }
        },
        methods: {
            // 获取用户信息列表
            getData(currentPage) {
                getMenuListData({
                    pageNo: currentPage,
                    pageSize: 10
                }).then(res => {
                    if(res.success) {
                        this.tableObject.data = res.body.list
                        this.totalPage = res.count
                    }
                })
            },
            // 获取菜单排序
            getSort(languageType) {
                getMenuSortData({}).then(res => {
                    this.$set(this.form, 'sort', res)
                })
            },
            // 获取单条用户信息
            getSingleData(id) {
                updateMenuData({
                    id: id
                }).then(res => {
                    this.$set(this.form, 'languageType', res.body.kubProductInfo.languageType)
                    this.$set(this.form, 'name', res.body.kubProductInfo.name)
                    this.$set(this.form, 'sort', res.body.kubProductInfo.sort)
                    this.$set(this.form, 'id', id)
                })
            },
            // 分页切换
            handleCurrentChange(page) {
                this.currentPage = page
                this.getData(this.currentPage)
            },
            // 新增
            handleAddMessage() {
                this.title = '新增'
                this.editDialogShow = true
                this.getSort()
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
                    deleteMenuData,
                    {id: this.delId},
                    batchDeleteMenuData,
                    {ids: this.multipSelectId}
                )
                .then(res => {
                    if(res.success) {
                        this.delDialogShow = false
                        this.getData(this.currentPage)
                    }
                })
            },
            // 保存
            handleSave() {
                saveMenuData(this.form).then(res => {
                    if(res.success) {
                        this.$message.success(res.msg)
                        this.editDialogShow = false
                        this.form = {}
                        this.getData(this.currentPage)
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
            this.getData(this.currentPage)
        },
    }
</script>
