import { observable, action } from 'mobx'

export class GlobalStore {
    @observable
    cookies = {}

    @action
    async setCookies(config) {
        this.cookies = config
    }
}
export default new GlobalStore()
