import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Switch, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useStore } from "@/store";
import styles from "./index.module.less";
import { removeItem } from "@/utils/storage";
const NavHeader = () => {
	const { updateCollapsed, collapsed, userInfo } = useStore();
	const breadList = [
		{
			title: "首页",
		},
		{
			title: "工作台",
		},
	];
	const items: MenuProps["items"] = [
		{
			key: "email",
			label: `邮箱：${userInfo.userEmail}`,
		},
		{
			key: "logout",
			label: "退出",
		},
	];
	const toggleCollapsed = () => {
		updateCollapsed();
	};
	const onClick: MenuProps["onClick"] = ({ key }) => {
		if (key === "logout") {
			removeItem("token");
			location.href = "/login";
		}
	};
	return (
		<div className={styles.navHeader}>
			<div className={styles.left}>
				<div onClick={toggleCollapsed}>
					{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				</div>
				<Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
			</div>
			<div className="right">
				<Switch
					checkedChildren="暗黑"
					unCheckedChildren="默认"
					style={{ marginRight: 10 }}
				/>
				<Dropdown menu={{ items, onClick }} trigger={["click"]}>
					<span className={styles.nickName}>{userInfo.userName}</span>
				</Dropdown>
			</div>
		</div>
	);
};

export default NavHeader;
