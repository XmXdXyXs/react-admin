import { Button, Form, Input, App } from "antd";
import styles from "./index.module.less";
import { Login } from "@/types/index";
import { setItem } from "@/utils/storage";
import Api from "@/api/index";
import { useState } from "react";
import { useStore } from "@/store/index";
export default function LoginFc() {
	const { message } = App.useApp();
	const { updateToken } = useStore();
	const [loading, setLoading] = useState(false);
	const onFinish = async (values: Login.params) => {
		try {
			setLoading(true);
			const data: any = await Api.login(values);
			setLoading(false);
			updateToken(data);
			setItem("token", data);
			message.success("登录成功");
			location.href = "/welcome";
		} catch {
			setLoading(false);
		}
	};
	return (
		<div className={styles.login}>
			<div className={styles.loginWrapper}>
				<div className={styles.title}>系统登录</div>
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						name="userName"
						rules={[{ required: true, message: "Please input your username!" }]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						name="userPwd"
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item>
						<Button type="primary" block htmlType="submit" loading={loading}>
							登录
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
