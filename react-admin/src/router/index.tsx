import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "@/views/login/Login";
import Layout from "@/layout/index";
import Welcome from "@/views/welcome/index";
import Dashboard from "@/views/dashboard/index";
import User from "@/views/system/user";
import Dept from "@/views/system/dept";
import Menu from "@/views/system/menu";
import Role from "@/views/system/role";
import Error404 from "@/views/404";
import Error403 from "@/views/403";
import AutoLoader from "./AutoLoader";
export const routers = [
	{
		path: "/",
		element: <Navigate to="/welcome" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		id: "layout",
		element: <Layout />,
		loader: AutoLoader,
		children: [
			{
				path: "/welcome",
				element: <Welcome />,
				meta: {
					icon: "11111",
				},
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/userList",
				element: <User />,
			},
			{
				path: "/deptList",
				element: <Dept />,
			},
			{
				path: "/menuList",
				element: <Menu />,
			},
			{
				path: "/roleList",
				element: <Role />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/404"></Navigate>,
	},
	{
		path: "/404",
		element: <Error404 />,
	},
	{
		path: "/403",
		element: <Error403 />,
	},
];
export default createBrowserRouter(routers);
