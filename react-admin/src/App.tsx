/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer } from 'react'
import './App.css'
const NameContext: any = createContext({ name: null })
interface Action {
	type: string
	name: string
}
function reduce(state: string, action: Action) {
	if (action.type == 'A') {
		return action.name
	}
	return state
}
function App() {
	const [state, dispatch] = useReducer(reduce, 'jay')
	return (
		<>
			<NameContext.Provider value={{ state, dispatch }}>
				<p>学习react18</p>
				<Child2 />
				<Child />
			</NameContext.Provider>
		</>
	)
}
const Child = () => {
	const { state, dispatch }: any = useContext(NameContext)
	const handleName = () => {
		dispatch({ type: 'A', name: 'jay sun' })
	}
	return (
		<>
			<div>{state}</div>
			<button onClick={handleName}>名字</button>
		</>
	)
}

const Child2 = () => {
	const user: any = useContext(NameContext)
	return <div>{user.state}</div>
}

export default App
