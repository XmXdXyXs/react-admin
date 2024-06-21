/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Layout } from "antd";
import {
	Outlet,
	useRouteLoaderData,
	useMatches,
	useLocation,
	Navigate,
} from "react-router-dom";
import NavHeader from "@/components/NavHeader/index";
import NavFooter from "@/components/NavFooter/index";
import SideMenu from "@/components/Menu/index";
import styles from "./index.module.less";
import api from "@/api/index";
import { searchRoute } from "@/utils";
import { routers } from "@/router";
import { useStore } from "@/store/index";
const { Sider } = Layout;

const App: React.FC = () => {
	const match = useMatches();
	console.log(match, "match");
	const data: any = useRouteLoaderData("layout");
	console.log(data, "data");
	const { collapsed, updateUserInfo } = useStore();
	const { pathname } = useLocation();
	useEffect(() => {
		getUserInfo();
	}, []);
	const getUserInfo = async () => {
		const data = await api.getUserInfo();
		updateUserInfo(data);
	};

	const route = searchRoute(pathname, routers);
	if (route && route.meta?.auth === false) {
		// 继续执行
	} else {
		// 权限判断
		const staticPath = ["/welcome", "/403", "/404"];
		if (
			!data.menuPathList.includes(pathname) &&
			!staticPath.includes(pathname)
		) {
			return <Navigate to="/403" />;
		}
	}
	return (
		<Layout>
			<Sider collapsed={collapsed}>
				<SideMenu />
			</Sider>
			<Layout>
				<NavHeader />
				<div className={styles.content}>
					<div className={styles.wrapper}>
						<Outlet></Outlet>
					</div>
					<NavFooter />
				</div>
			</Layout>
		</Layout>
	);
};

export default App;
