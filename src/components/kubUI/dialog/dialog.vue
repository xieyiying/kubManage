<template>
    <div class="del_dialog">
        <el-dialog 
          :title="title"
          :visible.sync="visible"
          @close="$emit('update:show', false)"
          :show="show"
          :width="width + 'px'"
        >
            <div class="del-dialog-cnt" v-if="title === '删除'">删除不可恢复，是否确定删除？</div>
            <slot v-else></slot>
            <span slot="footer" class="dialog-footer">
                <el-button @click="colseDialog">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
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
            }
        },
        data () {
            return {
                visible: this.show
            };
        },
        methods: {
            deleteRow() {
                this.$emit('confirm')
            },
            colseDialog() {
                this.visible = false
                this.$emit('colseDialog', this.visible)
            }
        },
        watch: {
            show () {
                this.visible = this.show;
            }
        }
    }
</script>
