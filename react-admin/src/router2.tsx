/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, redirect, useLoaderData } from 'react-router-dom'
import App from './App.tsx'

interface Obj {
	token?: string
	user?: string
}
export function RouterComponentOrder() {
	const data: Obj = useLoaderData() as Obj
	console.log(data)
	return (
		<div>
			<h1>商品列表</h1>
			<p>token: {data.token}</p>
			<p>user: {data.user}</p>
		</div>
	)
}

export function RouterComponentFound() {
	return <div>404</div>
}

export function RouterComponentLogin() {
	return <div>登录页面</div>
}

async function createLoader({ params }: any) {
	console.log(params.id)
	if (!localStorage.token) {
		return redirect('/login')
	}
	let obj: Obj = {}
	const data = await fetch('/mock/user.json').then(res => res.json())
	if (data.code === '00000') {
		obj = {
			...data.data,
			token: localStorage.token
		}
	}
	return obj
}
const routes = createBrowserRouter([
	{
		path: '/',
		element: <App />
	},
	{
		path: '/order/:id',
		element: <RouterComponentOrder />,
		loader: createLoader
	},
	{
		path: '/login',
		element: <RouterComponentLogin />
	},
	{
		path: '*',
		element: <RouterComponentFound />
	}
])

export default routes
