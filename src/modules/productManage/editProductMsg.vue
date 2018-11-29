<template>
    <div class="edit_message">
        <c-breadcrumb :tableTitle="tableTitle"></c-breadcrumb>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="130px" :rules="rules" style="width: 900px;">
                    <el-form-item label="语言类型：" prop="languageType">
                        <el-select v-model="form.languageType" placeholder="请选择语言">
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in languageList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品系列标题：" prop="title">
                        <el-input v-model.trim="form.title" placeholder="请输入产品系列标题"></el-input>
                    </el-form-item>
                    <el-form-item label="背景图：" prop="productBackground">
                        <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="productBackground" imageName="productBackground"></c-upload>
                    </el-form-item>
                    <el-form-item label="主图：" prop="productMainPhoto">
                        <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="productMainPhoto" imageName="productMainPhoto"></c-upload>
                    </el-form-item>
                    <el-form-item label="标题：" prop="productTitle">
                        <el-input v-model.trim="form.productTitle" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="产品介绍：" prop="introduce">
                        <el-input v-model.trim="form.introduce" placeholder="请输入产品介绍"></el-input>
                    </el-form-item>
                    <el-form-item label="内容：" prop="productContent">
                        <vue-editor name="imageContent" useCustomImageHandler @imageAdded="handleImageAdded" v-model="form.productContent"></vue-editor>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                        <el-button @click="backHomeManage('form')">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import mixin from '@/mixins/mixin'
    import { productInterfaceRequest } from '@/config/httpRequest'
    import { VueEditor } from 'vue2-editor'
    import { editTips } from '@/config/utils'
    export default {
        name: 'editProductMsg',
        mixins: [mixin],
        components: {
            VueEditor
        },
        data() {
            return {
                tableTitle: '',
                form: {},
                rules: {
                    languageType: [
                        { required: true, message: '请选择语言', trigger: 'blur' }
                    ],
                    productBackground: [
                        { required: true, message: '请选择图片' }
                    ],
                    productTitle: [
                        { required: true, message: '请输入标题', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '请输入产品系列标题', trigger: 'blur' }
                    ],
                    introduce: [
                        { required: true, message: '请输入产品介绍', trigger: 'blur' }
                    ],
                    productContent: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                    productMainPhoto: [
                        { required: true, message: '请选择图片' }
                    ],
                },
                languageList: [],
                productBackground: [],
                productMainPhoto: [],
            }
        },
        methods: {
            // 获取单条用户信息
            getSingleData(id) {
                
                productInterfaceRequest.updateData({
                    id: id
                }).then(res => {
                    this.form = {}
                    this.productBackground = []
                    this.productMainPhoto = []
                    this.productBackground.push({
                        url: res.body.kubNavigatHome.productBackground
                    })
                    this.productMainPhoto.push({
                        url: res.body.kubNavigatHome.productMainPhoto
                    })
                    this.$set(this.form, 'languageType', res.body.kubNavigatHome.languageType)
                    this.$set(this.form, 'productBackground', res.body.kubNavigatHome.productBackground)
                    this.$set(this.form, 'productTitle', res.body.kubNavigatHome.productTitle)
                    this.$set(this.form, 'productContent', res.body.kubNavigatHome.productContent)
                    this.$set(this.form, 'productMainPhoto', res.body.kubNavigatHome.productMainPhoto)
                    this.$set(this.form, 'title', res.body.kubNavigatHome.title)
                    this.$set(this.form, 'introduce', res.body.kubNavigatHome.introduce)
                    this.$set(this.form, 'id', id)
                })
            },
            // 图片上传成功
            uploadSuccess(response, file, fileList, imageName) {
                this.$set(this.form, imageName, response)
            },
            // 图片移除
            uploadRemove(file, fileList, imageName) {
                this.$set(this.form, imageName, [])
            },
            // 保存
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        productInterfaceRequest.saveData(this.form).then(res => {
                            // this.$message.success(res.msg)
                            editTips(this.$route.query.title)
                            if(res.success) {
                                this.$refs[formName].resetFields()
                                this.productBackground = []
                                this.productMainPhoto = []
                                this.$router.push({path: '/productManage'})
                            }
                        })
                    } else {
                        this.$message.warning('保存失败，请填写完整信息！')
                        return false;
                    }
                })
            },
            backHomeManage(formName) {
                this.form = {}
                this.productBackground = []
                this.productMainPhoto = []
                this.$refs[formName].resetFields()
                this.$router.push({path: '/productManage'})
            }
        },
        created() {
            this.tableTitle = this.$route.query.title + '数据'
            this.form = {}
            this.productBackground = []
            this.productMainPhoto = []
        },
        activated() {
            if(this.$route.query.id) {
                this.getSingleData(this.$route.query.id)
            } else {
                this.form = {}
                this.productBackground = []
                this.productMainPhoto = []
            }
        }
    }
</script>
