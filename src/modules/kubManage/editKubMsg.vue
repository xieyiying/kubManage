<template>
    <div class="edit_home_message">
        <c-breadcrumb :tableTitle="tableTitle"></c-breadcrumb>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="110px" :rules="rules" style="width: 900px;">
                    <el-form-item label="语言类型：" prop="languageType">
                        <el-select v-model="form.languageType" placeholder="请选择语言">
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in languageList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="背景图：" prop="kubBackground">
                        <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="kubBackground" imageName="kubBackground"></c-upload>
                    </el-form-item>
                    <el-form-item label="标题头：" prop="kubTitleHeader">
                        <el-input v-model="form.kubTitleHeader" placeholder="请输入标题头"></el-input>
                    </el-form-item>
                    <el-form-item label="标题：" prop="kubTitle">
                        <el-input v-model="form.kubTitle" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="内容：" prop="kubContent">
                        <vue-editor name="imageContent" useCustomImageHandler @imageAdded="handleImageAdded" v-model="form.kubContent"></vue-editor>
                    </el-form-item>
                    <el-form-item label="详情背景图：" prop="kubDetailsBackground">
                        <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="kubDetailsBackground" imageName="kubDetailsBackground"></c-upload>
                    </el-form-item>
                    <el-form-item label="详情内容：" prop="kubDetailsContent">
                        <vue-editor name="imageContent" useCustomImageHandler @imageAdded="handleImageAdded" v-model="form.kubDetailsContent"></vue-editor>
                    </el-form-item>
                    <el-form-item label="老板介绍：" prop="boosIntroduce">
                        <vue-editor name="imageContent" useCustomImageHandler @imageAdded="handleImageAdded" v-model="form.boosIntroduce"></vue-editor>
                    </el-form-item>
                    <el-form-item label="老板照片：" prop="boosPhoto">
                        <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="boosPhoto" imageName="boosPhoto"></c-upload>
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
    import { kubInterfaceRequest } from '@/config/httpRequest'
    import { VueEditor } from 'vue2-editor'
    export default {
        name: 'editHomeMsg',
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
                    kubBackground: [
                        { required: true, message: '请选择图片' }
                    ],
                    kubTitleHeader: [
                        { required: true, message: '请输入标题头' }
                    ],
                    kubTitle: [
                        { required: true, message: '请输入标题' }
                    ],
                    kubContent: [
                        { required: true, message: '请输入内容' }
                    ],
                    kubDetailsBackground: [
                        { required: true, message: '请选择图片' }
                    ],
                    kubDetailsContent: [
                        { required: true, message: '请输入内容' }
                    ],
                    boosIntroduce: [
                        { required: true, message: '请输入内容' }
                    ],
                    boosPhoto: [
                        { required: true, message: '请选择图片' }
                    ],
                },
                languageList: [],
                kubBackground: [],
                kubDetailsBackground: [],
                boosPhoto: []
            }
        },
        methods: {
            // 获取单条用户信息
            getSingleData(id) {
                kubInterfaceRequest.updateData({
                    id: id
                }).then(res => {
                    this.kubBackground.push({
                        url: res.body.kubNavigatHome.kubBackground
                    })
                    this.kubDetailsBackground.push({
                        url: res.body.kubNavigatHome.kubDetailsBackground
                    })
                    this.boosPhoto.push({
                        url: res.body.kubNavigatHome.boosPhoto
                    })
                    this.$set(this.form, 'languageType', res.body.kubNavigatHome.languageType)
                    this.$set(this.form, 'kubBackground', res.body.kubNavigatHome.kubBackground)
                    this.$set(this.form, 'kubTitleHeader', res.body.kubNavigatHome.kubTitleHeader)
                    this.$set(this.form, 'kubTitle', res.body.kubNavigatHome.kubTitle)
                    this.$set(this.form, 'kubContent', res.body.kubNavigatHome.kubContent)
                    this.$set(this.form, 'kubDetailsBackground', res.body.kubNavigatHome.kubDetailsBackground)
                    this.$set(this.form, 'kubDetailsContent', res.body.kubNavigatHome.kubDetailsContent)
                    this.$set(this.form, 'boosIntroduce', res.body.kubNavigatHome.boosIntroduce)
                    this.$set(this.form, 'boosPhoto', res.body.kubNavigatHome.boosPhoto)
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
            onSubmit(formName) {
                console.log(this.form)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        kubInterfaceRequest.saveData(this.form).then(res => {
                            this.$message.success(res.msg)
                            if(res.success) {
                                this.$refs[formName].resetFields()
                                this.$router.push({path: '/kubManage'})
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
                this.$refs[formName].resetFields()
                this.$router.push({path: '/kubManage'})
            }
        },
        created() {
            this.tableTitle = this.$route.query.title + '数据'
        },
        activated() {
            if(this.$route.query.id) {
                this.getSingleData(this.$route.query.id)
            } else {
                this.form = {}
                this.kubBackground = []
                this.kubDetailsBackground = []
                this.boosPhoto = []
            }
        }
    }
</script>
