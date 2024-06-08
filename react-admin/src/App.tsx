/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState, useContext } from 'react'
import './App.css'
const NameContext: any = createContext({ name: null })
function App() {
	const [name, setName] = useState('jay')
	const handleName = () => {
		setName('jay sun')
	}
	return (
		<>
			<NameContext.Provider value={{ name }}>
				<p>学习react18</p>
				<Child />
				<button onClick={handleName}>名字</button>
			</NameContext.Provider>
		</>
	)
}
interface User {
	name: string | null
}
const Child = () => {
	const user: User = useContext(NameContext)
	return <div>{user.name}</div>
}

export default App
