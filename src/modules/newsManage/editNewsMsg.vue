<template>
    <div class="edit_message" ref="scrollBox">
        <c-breadcrumb :tableTitle="tableTitle"></c-breadcrumb>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="130px" :rules="rules" style="width: 900px;">
                    <el-form-item label="语言类型：" prop="languageType">
                        <el-select v-model="form.languageType" placeholder="请选择语言" @change="languageChange">
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in languageList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新闻类型：" prop="newsType">
                        <el-select v-model="form.newsType" placeholder="请选择新闻类型">
                            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in newsTypeList"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="新闻排序：" prop="sort">
                        <el-input v-model.trim="form.sort" placeholder="请输入新闻排序"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻表述：" prop="newDescr">
                        <el-input type="textarea" rows="5" v-model.trim="form.newDescr" placeholder="请输入新闻表述"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻封面图片：" prop="newsPhotoUrl">
                        <c-upload @on-success="uploadSuccess" @on-remove="uploadRemove" :fileList="newsPhotoUrl" imageName="newsPhotoUrl"></c-upload>
                    </el-form-item>
                    <el-form-item label="新闻标题：" prop="title">
                        <el-input v-model.trim="form.title" placeholder="请输入新闻标题"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻详情标题：" prop="newTitle">
                        <el-input v-model.trim="form.newTitle" placeholder="请输入新闻详情标题"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻时间：" prop="newsDate">
                        <el-date-picker v-model="form.newsDate" type="datetime" placeholder="请选择新闻日期时间" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions1"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否发布：" prop="isPublish">
                        <el-radio-group v-model="form.isPublish">
                            <el-radio :label="1">发布</el-radio>
                            <el-radio :label="0">不发布</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="新闻内容：" prop="content">
                        <vue-editor name="imageContent" useCustomImageHandler @imageAdded="handleImageAdded" v-model="form.content"></vue-editor>
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
    import { newsInterfaceRequest } from '@/config/httpRequest'
    import { editTips } from '@/config/utils'
    import { VueEditor } from 'vue2-editor'
    export default {
        name: 'editNewsMsg',
        mixins: [mixin],
        components: {
            VueEditor
        },
        data() {
            let checkSortValue = (rule, value, callback) => {
                let sortRegExp = /[^\d]/g
                if(value) {
                    if(sortRegExp.test(value) == true) {
                        callback(new Error('请输入数字！'))
                    } else {
                        callback()
                    }
                } else {
                    callback(new Error('请输入新闻排序！'))
                }
            }
            return {
                tableTitle: '',
                form: {
                    isPublish: 0
                },
                rules: {
                    languageType: [
                        { required: true, message: '请选择语言', trigger: 'blur' }
                    ],
                    newsType: [
                        { required: true, message: '请选择新闻类型', trigger: 'blur' }
                    ],
                    sort: [
                        { required: true, validator: checkSortValue, trigger: 'blur' }
                    ],
                    newDescr: [
                        { required: true, message: '请输入新闻表述', trigger: 'blur' }
                    ],
                    newsPhotoUrl: [
                        { required: true, message: '请选择新闻封面图片' }
                    ],
                    title: [
                        { required: true, message: '请输入新闻标题', trigger: 'blur' }
                    ],
                    newTitle: [
                        { required: true, message: '请输入新闻详情标题', trigger: 'blur' }
                    ],
                    newsDate: [
                        { required: true, message: '请选择新闻日期时间', trigger: 'blur' }
                    ],
                    isPublish: [
                        { required: true, message: '请选择是否发布', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请输入新闻内容', trigger: 'blur' }
                    ],
                },
                pickerOptions1: {
                    disabledDate (time) {
                        return time.getTime() > Date.now()
                    }
                },
                languageList: [],
                newsTypeList: [],
                newsPhotoUrl: [],
                isGetSort: false, // 是否执行获取sort的方法
            }
        },
        methods: {
            // 获取单条用户信息
            getSingleData(id) {
                newsInterfaceRequest.updateData({
                    id: id
                }).then(res => {
                    this.form = {
                        isPublish: 0
                    }
                    this.newsPhotoUrl = []
                    this.newsPhotoUrl.push({
                        url: res.body.kubNavigatHome.newsPhotoUrl
                    })
                    this.$set(this.form, 'languageType', res.body.kubNavigatHome.languageType)
                    this.$set(this.form, 'newsType', res.body.kubNavigatHome.newsType)
                    this.$set(this.form, 'sort', res.body.kubNavigatHome.sort)
                    this.$set(this.form, 'newDescr', res.body.kubNavigatHome.newDescr)
                    this.$set(this.form, 'newsPhotoUrl', res.body.kubNavigatHome.newsPhotoUrl)
                    this.$set(this.form, 'title', res.body.kubNavigatHome.title)
                    this.$set(this.form, 'newTitle', res.body.kubNavigatHome.newTitle)
                    this.$set(this.form, 'newsDate', res.body.kubNavigatHome.newsDate)
                    this.$set(this.form, 'isPublish', parseInt(res.body.kubNavigatHome.isPublish))
                    this.$set(this.form, 'content', res.body.kubNavigatHome.content)
                    this.$set(this.form, 'id', id)
                })
            },
            // 切换语言时 获取sort
            languageChange(languageType) {
                if(this.isGetSort) {
                    newsInterfaceRequest.getNewsSort({
                        languageType: languageType
                    }).then(res => {
                        this.$set(this.form, 'sort', res)
                        this.getNewsType(languageType)
                    })
                }
            },
            // 获取新闻类型
            getNewsType(languageType) {
                newsInterfaceRequest.getNewsType({
                    languageType: languageType
                }).then(res => {
                    this.newsTypeList = res
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
                        newsInterfaceRequest.saveData(this.form).then(res => {
                            // this.$message.success(res.msg)
                            editTips(this.$route.query.title)
                            if(res.success) {
                                this.newsPhotoUrl = []
                                this.$refs[formName].resetFields()
                                this.form.isPublish = 0
                                this.$router.push({path: '/newsManage'})
                            }
                        })
                    } else {
                        this.$message.warning('保存失败，请填写完整信息！')
                        return false;
                    }
                })
            },
            backHomeManage(formName) {
                this.form = {
                    isPublish: 0
                }
                this.newsPhotoUrl = []
                this.$refs[formName].resetFields()
                this.$router.push({path: '/newsManage'})
            },
            changeGetSort(title) {
                if(title === '编辑') {
                    this.isGetSort = false
                } else if(title === '新增') {
                    this.isGetSort = true
                }
            },
        },
        created() {
            this.tableTitle = this.$route.query.title + '数据'
            // this.getNewsType()
        },
        activated() {
            this.changeGetSort(this.$route.query.title)
            if(this.$route.query.id) {
                this.getSingleData(this.$route.query.id)
            } else {
                this.form = {
                    isPublish: 0
                }
                this.newsPhotoUrl = []
            }
        },
    }
</script>
