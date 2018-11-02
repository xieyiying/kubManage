<template>
    <div class="c-search">
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
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

        },
        methods: {
            // 批量删除
            delAll() {
                this.$emit('delAll')
            },
            // 搜索
            search() {
                this.$emit('searchItem', this.select_word)
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

