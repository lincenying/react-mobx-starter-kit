import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import config from './config'
import { setMessage } from '@/utils'

axios.interceptors.request.use(
    config => {
        NProgress.start()
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    NProgress.done()
    if (response.status === 200 || response.status === 304) {
        return response.data
    }
    return {
        success: false,
        data: ''
    }
}

function checkCode(res) {
    if (res.success !== true) {
        setMessage(res.message)
    }
    return res
}

export default {
    async post(url, data) {
        const response = await axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        const res = await checkStatus(response)
        return checkCode(res)
    },
    async get(url, params) {
        const response = await axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        const res = await checkStatus(response)
        return checkCode(res)
    }
}
