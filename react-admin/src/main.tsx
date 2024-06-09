import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom'
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
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}></Route>
				<Route path='/react' element={<RouterComponentReact />}></Route>
				<Route path='/vite' element={<RouterComponentVite />}></Route>
				{/* Navigate写法一 */}
				{/* <Route path='/test' element={<Navigate to='/react' />}></Route> */}
				{/* Navigate写法二 */}
				<Route path='/test' element={<RouterComponentTest />}></Route>
				{/* 404 */}
				<Route path='*' element={<RouterComponentFound />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
