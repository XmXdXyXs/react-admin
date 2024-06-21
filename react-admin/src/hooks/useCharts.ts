import * as echarts from "echarts";
import { useEffect, useRef, useState, RefObject } from "react";

export const useCharts = (): [
	RefObject<HTMLDivElement>,
	echarts.ECharts | undefined
] => {
	const chartRef = useRef<HTMLDivElement>(null);
	const [chartInstance, setChartInstance] = useState<echarts.ECharts>();
	useEffect(() => {
		const chart = echarts.init(chartRef.current);
		setChartInstance(chart);
	}, []);
	return [chartRef, chartInstance];
};
