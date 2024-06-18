/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import NavHeader from "@/components/NavHeader/index";
import NavFooter from "@/components/NavFooter/index";
import SideMenu from "@/components/Menu/index";
import styles from "./index.module.less";
import api from "@/api/index";
import { useStore } from "@/store/index";
const { Content, Sider } = Layout;

const App: React.FC = () => {
	const { collapsed, updateUserInfo } = useStore();
	useEffect(() => {
		getUserInfo();
	}, []);
	const getUserInfo = async () => {
		const data = await api.getUserInfo();
		updateUserInfo(data);
	};
	return (
		<Layout>
			<Sider collapsed={collapsed}>
				<SideMenu />
			</Sider>
			<Layout>
				<NavHeader />
				<Content className={styles.content}>
					<div>
						<Outlet />
					</div>
					<NavFooter />
				</Content>
			</Layout>
		</Layout>
	);
};

export default App;
