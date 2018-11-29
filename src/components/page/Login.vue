<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { LoginRequest } from '@/config/httpRequest'
    export default {
        data: function(){
            let checkLoginMsg = (rule, value, callback) => {
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
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, validator: checkLoginMsg, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: checkLoginMsg, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        LoginRequest({
                            name: this.ruleForm.username,
                            password: this.ruleForm.password
                        }).then(res => {
                            if(res.success) {
                                localStorage.setItem('username',this.ruleForm.username);
                                this.$router.push('/');
                                
                            } else {
                                this.$message.error(res.msg)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: rgba(56, 157, 170, 0.7);
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>