webpackJsonp([4],{GF4k:function(r,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=t("wWxp"),o={data:function(){var r=function(r,e,t){e?0==/^\S+$/.test(e)?t(new Error("不能包含空格！")):t():t(new Error("请输入信息！"))};return{ruleForm:{username:"",password:""},rules:{username:[{required:!0,validator:r,trigger:"blur"}],password:[{required:!0,validator:r,trigger:"blur"}]}}},methods:{submitForm:function(r){var e=this;this.$refs[r].validate(function(r){if(!r)return console.log("error submit!!"),!1;Object(s.a)({name:e.ruleForm.username,password:e.ruleForm.password}).then(function(r){r.success?(localStorage.setItem("username",e.ruleForm.username),e.$router.push("/")):e.$message.error(r.msg)}).catch(function(r){console.log(r)})})}}},n={render:function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("div",{staticClass:"login-wrap"},[t("div",{staticClass:"ms-title"},[r._v("后台管理系统")]),r._v(" "),t("div",{staticClass:"ms-login"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:r.ruleForm,rules:r.rules,"label-width":"0px"}},[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{attrs:{placeholder:"username"},model:{value:r.ruleForm.username,callback:function(e){r.$set(r.ruleForm,"username",e)},expression:"ruleForm.username"}})],1),r._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{type:"password",placeholder:"password"},nativeOn:{keyup:function(e){if(!("button"in e)&&r._k(e.keyCode,"enter",13,e.key,"Enter"))return null;r.submitForm("ruleForm")}},model:{value:r.ruleForm.password,callback:function(e){r.$set(r.ruleForm,"password",e)},expression:"ruleForm.password"}})],1),r._v(" "),t("div",{staticClass:"login-btn"},[t("el-button",{attrs:{type:"primary"},on:{click:function(e){r.submitForm("ruleForm")}}},[r._v("登录")])],1)],1)],1)])},staticRenderFns:[]};var a=t("VU/8")(o,n,!1,function(r){t("MOm1")},null,null);e.default=a.exports},MOm1:function(r,e){}});