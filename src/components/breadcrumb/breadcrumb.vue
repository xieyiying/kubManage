<template>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-tickets"></i> {{tableTitle}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
    export default {
        name: 'c-breadcrumb',
        props: {
            tableTitle: {
                type: String,
                default: '表格'
            }
        },
    }
</script>
<style>

</style>

