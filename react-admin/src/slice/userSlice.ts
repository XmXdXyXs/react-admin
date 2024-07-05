import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserData {
	id?: number
	name?: string
}
const initialState: UserData[] = []
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser(state, action: PayloadAction<UserData>) {
			state.push(action.payload)
		}
	}
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
