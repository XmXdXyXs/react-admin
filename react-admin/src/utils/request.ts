/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'

interface Result<T = any> {
	code: number
	data: T
	msg: string
}
// 创建实例
const instance = axios.create({
	baseURL: 'http://127.0.0.1:8000/',
	timeout: 8000,
	timeoutErrorMessage: '请求超时， 请稍后再试',
	withCredentials: true
})
instance.interceptors.request.use(
	config => {
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
		const data: Result = response.data
		if (data.code != 0) {
			return Promise.reject(data)
		}
		return data.data
	},
	error => {
		return Promise.reject(error.message)
	}
)
export default {
	get<T>(url: string, params?: object): Promise<T> {
		return instance.get(url, { params })
	},
	post<T>(url: string, data?: object): Promise<T> {
		return instance.post(url, data)
	}
}
