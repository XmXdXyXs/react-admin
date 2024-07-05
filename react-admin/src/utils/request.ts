/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import { showLoading, hiddenLoading } from './loading/index'

interface Result<T = any> {
	code: number
	data: T
	msg: string
}
// 创建实例
const instance = axios.create({
	baseURL: 'http://localhost:9000/',
	timeout: 8000,
	timeoutErrorMessage: '请求超时， 请稍后再试',
	withCredentials: true
})
instance.interceptors.request.use(
	config => {
		if (config.showLoading) {
			showLoading()
		}
		return {
			...config
		}
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

instance.interceptors.response.use(
	response => {
		hiddenLoading()
		const data: Result = response.data
		if (data.code != 0) {
			if (response.config.showError == false) {
				return Promise.resolve(data)
			} else {
				return Promise.reject(data)
			}
		}
		return data.data
	},
	error => {
		hiddenLoading()
		return Promise.reject(error.message)
	}
)
interface isConfig {
	showLoading?: boolean
	showError?: boolean
}
export default {
	get<T>(url: string, params?: object, options: isConfig = { showLoading: true, showError: true }): Promise<T> {
		return instance.get(url, { params, ...options })
	},
	post<T>(url: string, data?: object, options: isConfig = { showLoading: true, showError: true }): Promise<T> {
		return instance.post(url, data, options)
	}
}
