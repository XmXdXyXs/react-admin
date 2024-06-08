import { useState, useRef } from 'react'
import './App.css'

function App() {
	const [val, setValue] = useState('')
	const userRef = useRef<HTMLInputElement>(null)
	const handleRef = () => {
		console.log(userRef.current?.className)
		setValue(userRef.current?.value || '')
	}
	return (
		<>
			<p>{val}</p>
			<p>
				<input ref={userRef} className='input' />
				<button onClick={handleRef}>点击</button>
			</p>
		</>
	)
}

export default App
