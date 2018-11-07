<template>
    <div class="edit_home_message">
        <c-breadcrumb :tableTitle="tableTitle"></c-breadcrumb>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px" :rules="rules" style="width: 900px;">
                    <el-form-item label="语言类型" prop="languageType">
                        <el-select v-model="form.languageType" placeholder="请选择语言">
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in languageList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="homePhoto">
                        <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="homePhoto"></c-upload>
                    </el-form-item>
                    <el-form-item label="文字编辑">
                        <quill-editor ref="myTextEditor" v-model="form.homeConten" :options="editorOption" @blur="onEditorChange"></quill-editor>
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
    import { homeInterfaceRequest } from '@/config/httpRequest'
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'editHomeMsg',
        mixins: [mixin],
        components: {
            quillEditor
        },
        data() {
            return {
                tableTitle: '',
                form: {},
                rules: {
                    languageType: [
                        { required: true, message: '请选择语言', trigger: 'blur' }
                    ],
                    homePhoto: [
                        { required: true, message: '请选择图片' }
                    ],
                },
                editorOption: {
                    placeholder: '请输入内容'
                },
                languageList: [],
                homePhoto: []
            }
        },
        methods: {
            // 获取单条用户信息
            getSingleData(id) {
                homeInterfaceRequest.updateHomeData({
                    id: id
                }).then(res => {
                    console.log(res)
                    this.homePhoto.push({
                        url: res.body.kubNavigatHome.homePhoto
                    })
                    this.$set(this.form, 'languageType', res.body.kubNavigatHome.languageType)
                    this.$set(this.form, 'homeConten', res.body.kubNavigatHome.homeConten)
                    this.$set(this.form, 'homePhoto', res.body.kubNavigatHome.homePhoto)
                    this.$set(this.form, 'id', id)
                })
            },
            // 图片上传成功
            uploadSuccess(response, file, fileList) {
                this.$set(this.form, 'homePhoto', fileList[0].response)
            },
            // 图片移除
            uploadRemove(file, fileList) {

            },
            // 获取编辑框内容
            onEditorChange() {
                this.$set(this.form, 'homeConten', this.form.homeConten)
            },
            // 保存
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        homeInterfaceRequest.saveHomeData(this.form).then(res => {
                            this.$message.success(res.msg)
                            if(res.success) {
                                this.$router.push({path: '/homeManage'})
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
                this.$router.push({path: '/homeManage'})
            }
        },
        created() {
            this.tableTitle = this.$route.query.title + '数据'
            if(this.$route.query.id) {
                this.getSingleData(this.$route.query.id)
            }
        }
    }
</script>
