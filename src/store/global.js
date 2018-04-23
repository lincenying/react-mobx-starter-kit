import { observable, action } from 'mobx'

export class GlobalStore {
    @observable
    message = {
        type: '',
        content: '',
        title: ''
    }

    @action
    async setMessage(message) {
        if (typeof message === 'string') {
            this.message = {
                type: 'success',
                title: '',
                content: message
            }
        } else {
            this.message = message
        }
    }
}
export default new GlobalStore()
