/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState, memo, useCallback } from 'react'
import './App.css'

function App() {
	const [count, setCount] = useState(0)
	// 每次有属性发生变化 total都会重新执行一次
	const total = () => {
		console.log('total 1')
		const list = [1, 2, 3]
		return list.reduce((prev, current) => {
			return prev + current
		}, 0)
	}
	// useMemo 缓存值 除非第二个参数的依赖发生改变 才会重新执行
	const total2 = useMemo(() => {
		console.log('total 2')
		const list = [1, 2, 3]
		return list.reduce((prev, current) => {
			return prev + current
		}, 0)
	}, [])
	// useCallback 缓存函数 除非第二个参数的依赖发生改变 才会重新执行
	const handleChild = useCallback(() => {
		console.log('子组件点击事件')
	}, [])
	const handleCount = () => {
		setCount(count => count + 1)
	}
	return (
		<>
			<p>react18 学习</p>
			<p>total1:{total()}</p>
			<p>total2:{total2}</p>
			<p>count:{count}</p>
			<Child handleChild={handleChild} />
			<button onClick={handleCount}>点击</button>
		</>
	)
}
interface Props {
	handleChild: any
}
const Child = memo((props: Props) => {
	console.log('子组件渲染')
	return (
		<>
			<p onClick={props.handleChild}>子组件Child</p>
		</>
	)
})
export default App
