import axios, { AxiosError } from "axios";
import { showLoading, hiddenLoading } from "./loading/index";
import { getItem, removeItem } from "./storage";
import { Result } from "@/types/index";
import { message } from "./antdGlobal";
import env from "@/config";
// 创建实例
const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_API,
	timeout: 8000,
	timeoutErrorMessage: "请求超时， 请稍后再试",
	withCredentials: true,
});
instance.interceptors.request.use(
	(config) => {
		if (config.showLoading) {
			showLoading();
		}
		const token = getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		config.headers.icode = "D17A8126E9560F9A";
		if (env.mock) {
			config.baseURL = env.mockApi;
		} else {
			config.baseURL = env.baseApi;
		}
		return {
			...config,
		};
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		hiddenLoading();
		const data: Result = response.data;
		if (data.code == 500001) {
			removeItem("token");
			message.error(data.msg);
			// location.href = "/login";
		} else if (data.code != 0) {
			if (response.config.showError == false) {
				return Promise.resolve(data);
			} else {
				message.error(data.msg);
				return Promise.reject(data);
			}
		}
		return data.data;
	},
	(error) => {
		hiddenLoading();
		message.error(error.message);
		return Promise.reject(error.message);
	}
);
interface isConfig {
	showLoading?: boolean;
	showError?: boolean;
}
export default {
	get<T>(
		url: string,
		params?: object,
		options: isConfig = { showLoading: true, showError: true }
	): Promise<T> {
		return instance.get(url, { params, ...options });
	},
	post<T>(
		url: string,
		data?: object,
		options: isConfig = { showLoading: true, showError: true }
	): Promise<T> {
		return instance.post(url, data, options);
	},
};
