<template>
    <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="totalPage">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name:'c-pagination',
        props: {
            totalPage: {
                type: Number,
                default: 1
            }
        },
        methods: {
            // 切换分页
            handleCurrentChange(page) {
                this.$emit('current-change', page)
            }
        }
    }
</script>
