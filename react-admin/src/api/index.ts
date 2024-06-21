import request from "@/utils/request";
import {
	Login,
	User,
	Dashboard,
	ResultData,
	Dept,
	Menu,
	Role,
} from "@/types/index";
export default {
	// 登录
	login(data: Login.params) {
		return request.post("/users/login", data, { showLoading: false });
	},
	// 获取用户信息
	getUserInfo() {
		return request.get<User.UserItem>("/users/getUserInfo");
	},
	// 获取工作台汇总数据
	getReportData() {
		return request.get<Dashboard.ReportData>("/order/dashboard/getReportData");
	},
	// 获取折线图数据
	getLineData() {
		return request.get<Dashboard.LineData>("/order/dashboard/getLineData");
	},
	// 获取城市分布数据
	getPieCityData() {
		return request.get<Dashboard.PieData[]>("/order/dashboard/getPieCityData");
	},
	// 获取年龄分布数据
	getPieAgeData() {
		return request.get<Dashboard.PieData[]>("/order/dashboard/getPieAgeData");
	},
	// 获取折线图数据
	getRadarData() {
		return request.get<Dashboard.RadarData>("/order/dashboard/getRadarData");
	},
	// 获取用户列表
	getUserList(params: User.Params) {
		return request.get<ResultData<User.UserItem>>("/users/list", params);
	},
	// 创建用户
	createUser(data: User.CreateParams) {
		return request.post("/users/create", data);
	},
	// 编辑用户
	editUser(data: User.EditParams) {
		return request.post("/users/edit", data);
	},
	// 删除用户
	delUser(data: { userIds: number[] }) {
		return request.post("/users/delete", data);
	},
	// 部门列表
	getDeptList(params?: Dept.Params) {
		return request.get<Dept.DeptItem[]>("/dept/list", params);
	},
	// 获取当前账号下的所有用户
	getAllUserList() {
		return request.get<User.UserItem[]>("/users/all/list");
	},
	// 创建部门
	createDept(params: Dept.CreateParams) {
		return request.post("/dept/create", params);
	},
	// 修改部门
	eidtDept(params: Dept.EditParams) {
		return request.post("/dept/edit", params);
	},
	// 删除部门
	deleteDept(params: Dept.DelParams) {
		return request.post("/dept/delete", params);
	},
	// 菜单管理
	getMenuList(params?: Menu.Params) {
		return request.get<Menu.MenuItem[]>("/menu/list", params);
	},
	// 创建菜单
	createMenu(params: Menu.CreateParams) {
		return request.post("/menu/create", params);
	},
	// 编辑菜单
	editMenu(params: Menu.EditParams) {
		return request.post("/menu/edit", params);
	},
	// 删除菜单
	deleteMenu(params: Menu.DelParams) {
		return request.post("/menu/delete", params);
	},
	// 获取权限列表
	getPermissionList() {
		return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>(
			"/users/getPermissionList"
		);
	},
	// 获取角色列表
	getRoleList(params: Role.Params) {
		return request.get<ResultData<Role.RoleItem>>("/roles/list", params);
	},
	// 创建角色
	createRole(params: Role.CreateParams) {
		return request.post("/roles/create", params);
	},
	// 编辑角色
	editRole(params: Role.EditParams) {
		return request.post("/roles/edit", params);
	},
	// 删除菜单
	// 删除角色
	delRole(params: { _id: string }) {
		return request.post("/roles/delete", params);
	},
	// 设置权限
	updatePermission(params: Role.Permission) {
		return request.post("/roles/update/permission", params);
	},
	// 获取所有角色列表
	getAllRoleList() {
		return request.get<Role.RoleItem[]>("/roles/allList");
	},
};
