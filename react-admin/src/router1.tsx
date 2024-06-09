/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRoutes } from 'react-router-dom'
import App from './App.tsx'

export function RouterComponentOrder() {
	return (
		<div>
			<h1>商品列表</h1>
		</div>
	)
}
function createLoader({ params }: any) {
	console.log(params.id)
	return {}
}
export function RouterComponentFound() {
	return <div>404</div>
}
function Router() {
	const routes = useRoutes([
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
			path: '*',
			element: <RouterComponentFound />
		}
	])
	return routes
}

export default Router
