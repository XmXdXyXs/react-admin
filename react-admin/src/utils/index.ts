import dayjs from "dayjs";
import { Menu } from "@/types/index";
/**
 * 工具函数封装
 */
// 格式化金额
export const formatMoney = (num?: number | string) => {
	if (!num) return "0.00";
	const a = parseFloat(num.toString());
	return a.toLocaleString("zh-CN", { style: "currency", currency: "CNY" });
};

// 格式化数字
export const formatNum = (num?: number | string) => {
	if (!num) return 0;
	const a = num.toString();
	if (a.indexOf(".") > -1) return a.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	return a.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
};

export const timeFormat = (
	timer: Date | string,
	format = "YYYY-MM-DD HH:mm"
) => {
	return dayjs(timer).format(format);
};

// 用户状态转换
export const formatState = (state: number) => {
	if (state === 1) return "在职";
	if (state === 2) return "试用期";
	if (state === 3) return "离职";
};

// 获取页面路径
export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
	return list.reduce((result: string[], item: Menu.MenuItem) => {
		return result.concat(
			Array.isArray(item.children) && !item.buttons
				? getMenuPath(item.children)
				: item.path + ""
		);
	}, []);
};

// 递归获取路由对象
export const searchRoute: any = (path: string, routes: any = []) => {
	for (const item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			return searchRoute(path, item.children);
		}
	}
	return "";
};
