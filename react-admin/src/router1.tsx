import { useRoutes, Link, Navigate } from 'react-router-dom'
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
			path: '*',
			element: <RouterComponentFound />
		}
	])
	return routes
}

export default Router
