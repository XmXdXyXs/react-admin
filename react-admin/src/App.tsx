import { useDispatch } from 'react-redux'
import './App.css'
import User from './view/user'
import { addUser } from './slice/userSlice'

function App() {
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
