import { action, observable } from 'mobx'
import api from '~/api'

export class TopicsStore {
    @observable hasNext = 0
    @observable page = 1
    @observable pathname = ''
    @observable data = []

    @action async getTopics(config) {
        const { data, success } = await api.get('/testapi/v1/topics', config)
        if (success === true) {
            this.data = config.page === 1 ? [].concat(data) : this.data.concat(data)
            this.page = config.page
            this.pathname = config.pathname
        }
    }
}
export default new TopicsStore()
