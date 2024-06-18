/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 存储数据
 * @param key {string} 储存key值
 * @param value {any} 储存value值
 */
export const setItem = (key: string, value: any) => {
	if (typeof value === "object") {
		value = JSON.stringify(value);
	}
	window.localStorage.setItem(key, value);
};

/**
 * 获取数据
 * @param key {string} 参数名
 */
export const getItem = (key: string) => {
	const data = window.localStorage.getItem(key);
	if (data) {
		try {
			return JSON.parse(data);
		} catch (err) {
			return data;
		}
	}
	return null;
};

/**
 * 删除数据
 * @param key {string} 参数名
 */
export const removeItem = (key: string) => {
	window.localStorage.removeItem(key);
};

/**
 * 删除所有数据
 */
export const clear = () => {
	window.localStorage.clear();
};
