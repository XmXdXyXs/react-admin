import React from "react";
import { Menu } from "antd";
import styles from "./index.module.less";
import { useStore } from "@/store/index";
import { Menu as IMenu } from "@/types/index";
import * as Icons from "@ant-design/icons";
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom";
import type { MenuProps } from "antd/es/menu";
import { useEffect, useState } from "react";
const SideMenu = () => {
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [selectedKeys, setselectedKeys] = useState<string[]>([]);
	const navigate = useNavigate();
	const collapsed = useStore((state) => state.collapsed);
	const data: any = useRouteLoaderData("layout");
	type MenuItem = Required<MenuProps>["items"][number];
	// 生成每一个菜单项
	function getItem(
		label: React.ReactNode,
		key?: React.Key | null,
		icon?: React.ReactNode,
		children?: MenuItem[]
	): MenuItem {
		return {
			label,
			key,
			icon,
			children,
		} as MenuItem;
	}
	function createIcon(name?: string) {
		if (!name) return <></>;
		const customerIcons: { [key: string]: any } = Icons;
		const icon = customerIcons[name];
		if (!icon) return <></>;
		return React.createElement(icon);
	}
	// 递归生成菜单
	const getTreeMenu = (
		menuList: IMenu.MenuItem[],
		treeList: MenuItem[] = []
	) => {
		menuList.forEach((item, index) => {
			if (item.menuType === 1 && item.menuState === 1) {
				if (item.buttons)
					return treeList.push(
						getItem(item.menuName, item.path || index, createIcon(item.icon))
					);
				treeList.push(
					getItem(
						item.menuName,
						item.path || index,
						createIcon(item.icon),
						getTreeMenu(item.children || [])
					)
				);
			}
		});
		return treeList;
	};
	const { pathname } = useLocation();
	// 初始化，获取接口菜单列表数据
	useEffect(() => {
		const treeMenuList = getTreeMenu(data.menuList);
		setMenuList(treeMenuList);
		setselectedKeys([pathname]);
	}, []);
	const handleClickLogo = () => {
		navigate("/welcome");
	};
	// 菜单点击
	const handleClickMenu = ({ key }: { key: string }) => {
		setselectedKeys([key]);
		navigate(key);
	};
	return (
		<div>
			<div className={styles.logo} onClick={handleClickLogo}>
				<img src="/imgs/vite.svg" className={styles.img} />
				{collapsed ? "" : <span className="logo-text">管理后台</span>}
			</div>
			<Menu
				defaultSelectedKeys={["1"]}
				mode="inline"
				theme="dark"
				selectedKeys={selectedKeys}
				onClick={handleClickMenu}
				style={{
					width: collapsed ? 80 : "auto",
				}}
				items={menuList}
			/>
		</div>
	);
};

export default SideMenu;
