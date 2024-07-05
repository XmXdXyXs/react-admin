import { useDispatch } from 'react-redux'
import './App.css'
import User from './view/user'
import { addUser } from './slice/userSlice'
import request from './utils/request'
import { useEffect } from 'react'

function App() {
	useEffect(() => {
		getUserList()
	}, [])
	const getUserList = async () => {
		const data = await request.get('/list')
		console.log(data)
	}
	const dispath = useDispatch()
	return (
		<>
			<User />
			<hr />
			<button onClick={() => dispath(addUser({ id: 111, name: 'lala' }))}>添加用户</button>
		</>
	)
}

export default App
