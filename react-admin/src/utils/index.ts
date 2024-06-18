import dayjs from "dayjs";
/**
 * 工具函数封装
 */

export const formatMoney = (num: number | string) => {
	const a = parseFloat(num.toString());
	return a.toLocaleString("zh-CN", { style: "currency", currency: "CNY" });
};

export const timeFormat = (timer: Date, format = "YYYY-MM-DD HH:mm") => {
	return dayjs(timer).format(format);
};
