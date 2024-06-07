/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useWindowSize } from './useWindowSize'
import './App.css'

function App() {
	console.log(111)
	const [count, setCount] = useState(1)
	const [total, setTotal] = useState(5)
	// 模拟componentDidMounted
	useEffect(() => {
		document.title = '欢迎学习react18'
	}, [])
	// 模拟watch
	useEffect(() => {
		setTotal(() => count * 5)
	}, [count])

	// 模拟销毁
	// useEffect(() => {
	// 	const t = setInterval(() => {
	// 		setCount(count => count + 1)
	// 	}, 1000)
	// 	return () => {
	// 		clearInterval(t)
	// 	}
	// }, [])
	const handleCount = () => {
		setCount(count => count + 1)
	}

	// 自定义hooks
	const [size] = useWindowSize()
	return (
		<div className='App'>
			<p>欢迎学习react18</p>
			<p>
				count: {count} total:{total}
			</p>
			<p>
				window-width: {size.width} window-height: {size.height}
			</p>
			<button onClick={handleCount}>点击</button>
		</div>
	)
}

export default App
