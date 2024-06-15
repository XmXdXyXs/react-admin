/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";

// 创建实例
const instance = axios.create({
	baseURL: "/api",
	timeout: 8000,
	timeoutErrorMessage: "请求超时， 请稍后再试",
	withCredentials: true,
});
instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		config.headers.Authorization = `Bearer ${token}`;
		return {
			...config,
		};
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use((response) => {
	const data = response.data;
	if (data.code === 500001) {
		localStorage.removeItem("token");
		// location.href = "/login";
	} else if (data.code != 0) {
		message.error(data.msg);
		return Promise.reject(data);
	}
	return data.data;
});
export default {
	get(url: string, params: any) {
		return instance.get(url, { params });
	},
	post(url: string, data: any) {
		return instance.get(url, data);
	},
};
