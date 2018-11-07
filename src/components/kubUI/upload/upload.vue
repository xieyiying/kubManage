<template>
    <div class="c-upload">
        <el-upload
          class="upload-demo"
          :action="action"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :limit="1"
        >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>
<script>
    import { httpUrl } from '@/config/network'
    export default {
        name: 'c-upload',
        data() {
            return {
                action: httpUrl + '/kubgw/page/kubgw/upload/imageUpload'
            }
        },
        props: {
            fileList: {
                type: Array
            }
        },
        methods: {
            handleSuccess(response, file, fileList) {
                console.log('success')
                this.$emit('on-success', response, file, fileList)
            },
            handleRemove(file, fileList) {
                console.log('remove')
                this.$emit('on-remove', file, fileList)
            }
        }
    }
</script>
