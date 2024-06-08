/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useTransition } from 'react'
import './App.css'

function App() {
	const [val, setValue] = useState('')
	const [list, setList] = useState<string[]>([])
	const [isPedding, startTransition] = useTransition()
	const userRef = useRef<HTMLInputElement>(null)
	const handleHandle = (e: any) => {
		setValue(e.target.value)
		startTransition(() => {
			setList((list: string[]) => {
				return [...list, e.target.value]
			})
		})
	}
	return (
		<>
			<p>
				<input ref={userRef} className='input' value={val} onChange={handleHandle} />
			</p>
			<p>
				{isPedding}
				{isPedding ? (
					<span>loading ...</span>
				) : (
					list.map((item, index) => {
						return (
							<span style={{ display: 'block' }} key={index}>
								{item}
							</span>
						)
					})
				)}
			</p>
		</>
	)
}

export default App
