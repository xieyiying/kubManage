<template>
    <div class="c-upload">
        <el-upload
          class="upload-demo"
          :action="action"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture"
          limit="1"
        >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>
<script>
    export default {
        name: 'c-upload',
        props: {
            action: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                fileList2: []
            }
        },
        methods: {
            handleSuccess(response, file, fileList) {
                console.log('success')
                
            },
            handleRemove(file, fileList) {
                console.log('remove')
            }
        }
    }
</script>
