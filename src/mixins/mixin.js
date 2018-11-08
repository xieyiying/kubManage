import { getLanguageType, uploadImage } from '@/config/httpRequest'

export default {
    methods: {
        getLanguage() {
            getLanguageType({}).then(res => {
                this.languageList = res
            })
        },
        handleImageAdded(file, Editor, cursorLocation) {
            var formData = new FormData();
            formData.append('file', file)
            this.$axios({
                url: uploadImage,
                method: 'POST',
                data: formData
            })
            .then((result) => {
                if(result.status === 200) {
                    let url = result.data // Get url from response
                    Editor.insertEmbed(cursorLocation, 'image', url);
                } else {
                    this.$message.error("图片载入失败！")
                }
                
            })
            .catch((err) => {
                this.$message.error("图片载入失败！")
                console.log(err);
            })
        },
    },
    mounted() {
        this.getLanguage()
    }
}