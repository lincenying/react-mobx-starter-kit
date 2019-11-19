import { observable, action } from 'mobx'
import api from '@/api'

export class ArticleStore {
    @observable
    isLoad = false
    @observable
    pathname = ''
    @observable
    data = {}

    @action
    async getArticle(config) {
        this.isLoad = false
        const { data, success } = await api.get('https://cnodejs.org/api/v1/topic/' + config.id)
        if (success === true) {
            this.isLoad = true
            this.data = data
            this.pathname = config.pathname
        }
    }
}
export default new ArticleStore()
