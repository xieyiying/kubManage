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
          :imageName="imageName"
        >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>
<script>
    import { uploadImage } from '@/config/httpRequest'
    export default {
        name: 'c-upload',
        data() {
            return {
                action: uploadImage
            }
        },
        props: {
            fileList: {
                type: Array
            },
            imageName: {
                type: String
            }
        },
        methods: {
            handleSuccess(response, file, fileList) {
                this.$emit('on-success', response, file, fileList, this.imageName)
            },
            handleRemove(file, fileList) {
                this.$emit('on-remove', file, fileList)
            }
        }
    }
</script>
