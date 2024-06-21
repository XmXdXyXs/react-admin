/* eslint-disable react-hooks/exhaustive-deps */
import { Descriptions, Card, Button } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
import { useStore } from "@/store";
import { formatState, formatMoney, formatNum } from "@/utils/index";
import api from "@/api/index";
import { Dashboard } from "@/types/index";
import { useCharts } from "@/hooks/useCharts";
export default function DashBoard() {
	const userInfo = useStore((state) => state.userInfo);
	const [report, setReport] = useState<Dashboard.ReportData>();
	const [lineChart, chartInstance] = useCharts();
	const [preChart, pieChartCityInstance] = useCharts();
	const [preChart2, pieChartAgeInstance] = useCharts();
	const [radarChart, radarChartDomInstance] = useCharts();
	useEffect(() => {
		renderLineChart();
		renderPieChart1();
		renderPieChart2();
		renderRadarChart();
	}, [
		chartInstance,
		pieChartCityInstance,
		pieChartAgeInstance,
		radarChartDomInstance,
	]);
	// 加载折现图
	const renderLineChart = async () => {
		if (!chartInstance) return;
		const data = await api.getLineData();
		chartInstance?.setOption({
			tooltip: {
				trigger: "axis",
			},
			legend: {
				data: ["订单", "流水"],
			},
			grid: {
				left: 50,
				right: 50,
				bottom: 20,
			},
			xAxis: {
				data: data.label,
			},
			yAxis: {
				type: "value",
			},
			series: [
				{
					name: "订单",
					type: "line",
					data: data.order,
				},
				{
					name: "流水",
					type: "line",
					data: data.money,
				},
			],
		});
	};
	// 加载饼图1
	const renderPieChart1 = async () => {
		if (!pieChartCityInstance) return;
		const data = await api.getPieCityData();
		pieChartCityInstance?.setOption({
			title: {
				text: "司机城市分布",
				left: "center",
			},
			tooltip: {
				trigger: "item",
			},
			legend: {
				orient: "vertical",
				left: "left",
			},
			series: [
				{
					name: "城市分布",
					type: "pie",
					radius: "50%",
					data,
				},
			],
		});
	};
	// 加载饼图2
	const renderPieChart2 = async () => {
		if (!pieChartAgeInstance) return;
		const data = await api.getPieAgeData();
		pieChartAgeInstance?.setOption({
			title: {
				text: "司机年龄分布",
				left: "center",
			},
			tooltip: {
				trigger: "item",
			},
			legend: {
				orient: "vertical",
				left: "left",
			},
			series: [
				{
					name: "年龄分布",
					type: "pie",
					radius: [50, 180],
					roseType: "area",
					data,
				},
			],
		});
	};
	// 加载雷达图
	const renderRadarChart = async () => {
		if (!radarChartDomInstance) return;
		const data = await api.getRadarData();
		radarChartDomInstance?.setOption({
			// title: {
			//   text: '司机模型诊断',
			//   left: 'center'
			// },
			legend: {
				data: ["司机模型诊断"],
			},
			radar: {
				indicator: data.indicator,
			},
			series: [
				{
					name: "模型诊断",
					type: "radar",
					data: data.data,
				},
			],
		});
	};
	useEffect(() => {
		getReportData();
	}, []);
	const getReportData = async () => {
		const data = await api.getReportData();
		setReport(data);
	};
	const handleLineRefer = () => {
		renderLineChart();
	};
	const handlePreRefer = () => {
		renderPieChart1();
		renderPieChart2();
	};
	const handleRadarRefer = () => {
		renderRadarChart();
	};
	return (
		<div className={styles.dashboard}>
			<div className={styles.userInfo}>
				<img
					src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
					alt=""
					className={styles.userImg}
				/>
				<Descriptions title="欢迎新同学，每天都要开心！">
					<Descriptions.Item label="用户ID">
						{userInfo.userId}
					</Descriptions.Item>
					<Descriptions.Item label="邮箱">
						{userInfo.userEmail}
					</Descriptions.Item>
					<Descriptions.Item label="状态">
						{formatState(userInfo.state)}
					</Descriptions.Item>
					<Descriptions.Item label="手机号">
						{userInfo.mobile}
					</Descriptions.Item>
					<Descriptions.Item label="岗位">{userInfo.job}</Descriptions.Item>
					<Descriptions.Item label="部门">
						{userInfo.deptName}
					</Descriptions.Item>
				</Descriptions>
			</div>
			<div className={styles.report}>
				<div className={styles.card}>
					<div className="title">司机数量</div>
					<div className={styles.data}>{formatNum(report?.driverCount)}个</div>
				</div>
				<div className={styles.card}>
					<div className="title">总流水</div>
					<div className={styles.data}>
						{formatMoney(report?.driverCount)}元
					</div>
				</div>
				<div className={styles.card}>
					<div className="title">总订单</div>
					<div className={styles.data}>{formatNum(report?.totalMoney)}单</div>
				</div>
				<div className={styles.card}>
					<div className="title">开通城市</div>
					<div className={styles.data}>{formatNum(report?.cityNum)}座</div>
				</div>
			</div>
			<div className={styles.chart}>
				<Card
					title="订单和流水走势图"
					extra={
						<Button type="primary" onClick={handleLineRefer}>
							刷新
						</Button>
					}
				>
					<div ref={lineChart} className={styles.itemChart}></div>
				</Card>
			</div>
			<div className={styles.chart}>
				<Card
					title="司机分布"
					extra={
						<Button type="primary" onClick={handlePreRefer}>
							刷新
						</Button>
					}
				>
					<div className={styles.pieChart}>
						<div ref={preChart} className={styles.itemPie}></div>
						<div ref={preChart2} className={styles.itemPie}></div>
					</div>
				</Card>
			</div>
			<div className={styles.chart}>
				<Card
					title="模型诊断"
					extra={
						<Button type="primary" onClick={handleRadarRefer}>
							刷新
						</Button>
					}
				>
					<div ref={radarChart} className={styles.itemChart}></div>
				</Card>
			</div>
		</div>
	);
}
