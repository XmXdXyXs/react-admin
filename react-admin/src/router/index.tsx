import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "@/views/login/Login";
import Layout from "@/layout/index";
import Welcome from "@/views/welcome/index";
import Error404 from "@/views/404";
import Error403 from "@/views/403";
const routers = [
	{
		path: "/",
		element: <Navigate to="/welcome" />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		element: <Layout />,
		children: [
			{
				path: "/welcome",
				element: <Welcome />,
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
