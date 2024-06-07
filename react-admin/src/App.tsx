import { useState } from 'react'
import './App.css'
import { flushSync } from 'react-dom'

function App() {
	console.log('update app')

	const [user, setUser] = useState({ name: 'jay sun', age: 30 })
	const [list, setList] = useState(['tom', 'jack'])
	const [count, setCount] = useState(0)
	const num = 0
	const [name, setName] = useState(() => {
		if (num === 0) {
			return 'jay sun'
		}
		return 'jay sun tnbl'
	})
	const handleUpdate = () => {
		setName('jay sun nb')
	}
	const handleUpdateUser = () => {
		setUser({ ...user, age: 18 })
	}
	const handleList = () => {
		setList([...list, 'lily'])
	}
	const handleCount = () => {
		// react 更新属于异步更新 会把多次更新合并到一起 批量更新 每次只加1
		// setCount(count + 1)
		// setCount(count + 1)
		// setCount(count + 1)
		// 跟上面没区别了 这里依旧是异步更新 在react16之前是同步更新
		// setTimeout(() => {
		// setCount(count + 1)
		// setCount(count + 1)
		// setCount(count + 1)
		// })
		// 这里也会批量更新 但是每次会拿到上次更新的值 所以执行一次加3
		// setCount(count => count + 1)
		// setCount(count => count + 1)
		// setCount(count => count + 1)

		// 强制同步更新 render 会执行两次
		flushSync(() => {
			setCount(count => count + 1)
		})
		flushSync(() => {
			setCount(count => count + 1)
		})
	}
	return (
		<div className='App'>
			<p>欢迎学习react18</p>
			<p>{name}</p>
			<p>
				<span>用户名称：{user.name}</span>
				<span style={{ marginLeft: 10 }}>用户名称：{user.age}</span>
			</p>
			<p>
				{list.map((item, index) => {
					return (
						<span key={index} style={{ marginRight: 10 }}>
							{item}
						</span>
					)
				})}
			</p>
			<p>{count}</p>
			<p>
				<button onClick={handleUpdate}>修改名称</button>
				<button onClick={handleUpdateUser}>修改用户</button>
				<button onClick={handleList}>修改数组</button>
				<button onClick={handleCount}>修改count</button>
			</p>
		</div>
	)
}

export default App
