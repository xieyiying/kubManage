<template>
    <div class="c-search">
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10" v-show="isSearch"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search" v-show="isSearch">搜索</el-button>
            <el-button type="primary" @click="addItem" style="float: right">新增</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'c-search',
        data() {
            return {
                select_word: ''
            }
        },
        props: {
            isSearch: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            // 批量删除
            delAll() {
                this.$emit('delAll')
            },
            // 搜索
            search() {
                this.$emit('searchItem', this.select_word)
            },
            // 新增
            addItem() {
                this.$emit('addMessage')
            }
        }
    }
</script>
<style>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>

