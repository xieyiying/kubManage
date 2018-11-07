<template>
    <div class="del_dialog">
        <el-dialog 
          :title="title"
          :visible.sync="visible"
          @close="closeDialog('ruleForm')"
          :show="show"
          :width="width + 'px'"
        >
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <div class="del-dialog-cnt" v-if="title === '删除'">删除不可恢复，是否确定删除？</div>
                <slot v-else></slot>
                <div class="dialog-footer" style="margin-top: 10px;">
                    <el-form-item>
                        <el-button @click="closeDialog('ruleForm')">取 消</el-button>
                        <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
                    </el-form-item>  
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'c-dialog',
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            width: {
                type: Number,
                default: 300
            },
            form: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            rules: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            callback: {
                type: Function,
            }
        },
        data () {
            return {
                visible: this.show
            };
        },
        methods: {
            confirm(formName) {
                if(this.callback) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.callback()
                        } else {
                            this.$message.warning('保存失败，请填写完整信息！')
                            return false;
                        }
                    })
                } else {
                    this.$emit('confirm')
                }
            },
            closeDialog(formName) {
                if(formName) {
                    this.$refs[formName].resetFields()
                }
                this.$emit('closeDialog')
            },
        },
        watch: {
            show () {
                this.visible = this.show
            }
        }
    }
</script>
