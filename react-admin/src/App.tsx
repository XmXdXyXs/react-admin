import { useDispatch } from 'react-redux'
import './App.css'
import User from './view/user'
import { addUser, userQuery } from './slice/userSlice'
import { StoreDispatch } from './store'

function App() {
	const dispath: StoreDispatch = useDispatch()
	return (
		<>
			<User />
			<hr />
			<button onClick={() => dispath(userQuery())}>查新用户</button>
			<button onClick={() => dispath(addUser({ id: 111, name: 'lala' }))}>添加用户</button>
		</>
	)
}

export default App
