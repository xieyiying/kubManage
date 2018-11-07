import { getLanguageType } from '@/config/httpRequest'

export default {
    methods: {
        getLanguage() {
            getLanguageType({}).then(res => {
                this.languageList = res
            })
        }
    },
    mounted() {
        this.getLanguage()
    }
}