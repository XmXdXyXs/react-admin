import { createBrowserRouter, Link, Navigate, Outlet, useParams } from 'react-router-dom'
import App from './App.tsx'

export function RouterComponentReact() {
	return <div>欢迎学习react{<Link to='/'>back</Link>}</div>
}

export function RouterComponentVite() {
	return <div>欢迎学习vite</div>
}

export function RouterComponentTest() {
	return (
		<div>
			重定向页面
			<Navigate to='/react' />
		</div>
	)
}

export function RouterComponentShop() {
	const params = useParams()
	return (
		<div>
			<h1>商品商城</h1>
			<p>商品id: {params.id}</p>
			<p>订单id: {params.orderId}</p>
		</div>
	)
}

export function RouterComponentGoods() {
	return (
		<div>
			<h1>商品主页</h1>
			<Outlet></Outlet>
		</div>
	)
}

export function RouterComponentFound() {
	return <div>404</div>
}
const routes = createBrowserRouter(
	[
		{
			path: '/',
			element: <App />
		},
		{
			path: '/react',
			element: <RouterComponentReact />
		},
		{
			path: '/vite',
			element: <RouterComponentVite />
		},
		{
			path: '/test',
			element: <RouterComponentTest />
		},
		{
			path: '/shop/:id/order/:orderId',
			element: <RouterComponentShop />
		},
		{
			path: '/goods',
			element: <RouterComponentGoods />,
			children: [
				{
					path: 'list',
					element: (
						<div>
							<p>苹果手机</p>
							<p>华为手机</p>
						</div>
					)
				},
				{
					path: 'cat',
					element: (
						<div>
							<p>小米su7</p>
							<p>极氪007</p>
						</div>
					)
				}
			]
		},
		{
			path: '*',
			element: <RouterComponentFound />
		}
	],
	// 设置基础路由地址
	{
		basename: '/app'
	}
)

export default routes
