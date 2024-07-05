import { useSelector } from 'react-redux'
import { StoreData } from '../store/index'
const User = () => {
	const users = useSelector((state: StoreData) => state.users.users)
	return (
		<div>
			<ul>
				{users.map(item => {
					return <li key={item.id}>{item.name}</li>
				})}
			</ul>
		</div>
	)
}

export default User
