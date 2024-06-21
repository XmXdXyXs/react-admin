import { User, PageParams, IAction } from "@/types/index";
import { Button, Table, Form, Input, Select, Space, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { message } from "@/utils/antdGlobal";
import api from "@/api";
import { timeFormat } from "@/utils";
import CreateUser from "./CreateUser";
export default function UserList() {
	const [form] = Form.useForm();
	const [data, setData] = useState<User.UserItem[]>([]);
	const [total, setTotal] = useState(0);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
	});
	const [userIds, setUserIds] = useState<number[]>([]);
	useEffect(() => {
		getUserList({
			pageNum: pagination.current,
			pageSize: pagination.pageSize,
		});
	}, [pagination.current, pagination.pageSize]);
	const getUserList = async (params: PageParams) => {
		const values = form.getFieldsValue();
		const data = await api.getUserList({
			...values,
			pageNum: params.pageNum,
			pageSize: params.pageSize,
		});
		setData(data.list);
		setTotal(data.page.total);
		setPagination({
			current: data.page.pageNum,
			pageSize: data.page.pageSize,
		});
	};

	const userRef = useRef<{
		open: (type: IAction, data?: User.UserItem) => void;
	}>();
	const handleCreate = () => {
		userRef.current?.open("create");
	};

	const handleEdit = (recode: User.UserItem) => {
		userRef.current?.open("edit", recode);
	};

	const handleDel = (userId: number) => {
		Modal.confirm({
			title: "删除确认",
			content: <span>确认删除该用户吗？</span>,
			onOk: () => {
				handleUserDelSubmit([userId]);
			},
		});
	};

	// 公共删除用户接口
	const handleUserDelSubmit = async (ids: number[]) => {
		try {
			await api.delUser({
				userIds: ids,
			});
			message.success("删除成功");
			setUserIds([]);
			getUserList({
				pageNum: 1,
				pageSize: pagination.pageSize,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// 批量删除确认
	const handlePatchConfirm = () => {
		if (userIds.length === 0) {
			message.error("请选择要删除的用户");
			return;
		}
		Modal.confirm({
			title: "删除确认",
			content: <span>确认删除该批用户吗？</span>,
			onOk: () => {
				handleUserDelSubmit(userIds);
			},
		});
	};

	const columns: ColumnsType<User.UserItem> = [
		{
			title: "用户ID",
			dataIndex: "userId",
			key: "userId",
		},
		{
			title: "用户名称",
			dataIndex: "userName",
			key: "userName",
		},
		{
			title: "用户邮箱",
			dataIndex: "userEmail",
			key: "userEmail",
		},
		{
			title: "用户角色",
			dataIndex: "role",
			key: "role",
			render(role: number) {
				return {
					0: "超级管理员",
					1: "管理员",
					2: "体验管理员",
					3: "普通用户",
				}[role];
			},
		},
		{
			title: "用户状态",
			dataIndex: "state",
			key: "state",
			render(state: number) {
				return {
					1: "在职",
					2: "离职",
					3: "试用期",
				}[state];
			},
		},
		{
			title: "注册时间",
			dataIndex: "createTime",
			key: "createTime",
			render(createTime: string) {
				return timeFormat(createTime);
			},
		},
		{
			title: "操作",
			key: "address",
			render(recode: User.UserItem) {
				return (
					<Space>
						<Button type="text" onClick={() => handleEdit(recode)}>
							编辑
						</Button>
						<Button type="text" danger onClick={() => handleDel(recode.userId)}>
							删除
						</Button>
					</Space>
				);
			},
		},
	];
	return (
		<div className="user-list">
			<Form
				form={form}
				className="search-form"
				layout="inline"
				initialValues={{ state: 1 }}
			>
				<Form.Item name="userId" label="用户ID">
					<Input placeholder="请输入用户ID" />
				</Form.Item>
				<Form.Item name="userName" label="用户名称">
					<Input placeholder="请输入用户名称" />
				</Form.Item>
				<Form.Item name="state" label="状态">
					<Select style={{ width: 120 }}>
						<Select.Option value={0}>所有</Select.Option>
						<Select.Option value={1}>在职</Select.Option>
						<Select.Option value={2}>试用期</Select.Option>
						<Select.Option value={3}>离职</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Space>
						<Button
							type="primary"
							onClick={() =>
								getUserList({
									pageNum: 1,
									pageSize: pagination.pageSize,
								})
							}
						>
							搜索
						</Button>
						<Button type="default">重置</Button>
					</Space>
				</Form.Item>
			</Form>
			<div className="base-table">
				<div className="header-wrapper">
					<div className="title">用户列表</div>
					<div className="action">
						<Button type="primary" onClick={handleCreate}>
							新增
						</Button>
						<Button type="primary" danger onClick={handlePatchConfirm}>
							批量删除
						</Button>
					</div>
				</div>
				<Table
					bordered
					dataSource={data}
					columns={columns}
					rowKey="userId"
					rowSelection={{
						type: "checkbox",
						selectedRowKeys: userIds,
						onChange: (selectedRowKeys) => {
							setUserIds(selectedRowKeys as number[]);
						},
					}}
					pagination={{
						position: ["bottomRight"],
						current: pagination.current,
						pageSize: pagination.pageSize,
						total,
						showQuickJumper: true,
						showSizeChanger: true,
						showTotal: function (total) {
							return `总共：${total}条`;
						},
						onChange: (page, pageSize) => {
							setPagination({
								current: page,
								pageSize,
							});
						},
					}}
				/>
			</div>
			<CreateUser
				mRef={userRef}
				update={() => {
					getUserList({
						pageNum: 1,
						pageSize: pagination.pageSize,
					});
				}}
			/>
		</div>
	);
}
