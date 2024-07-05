/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import request from '../utils/request'

interface UserData {
	id?: number
	name?: string
}
interface UserData2 {
	users: UserData[]
}
const initialState: UserData2 = {
	users: []
}

export const userQuery = createAsyncThunk('user/query', async () => {
	return await request.get('/user/list')
})
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser(state, action: PayloadAction<UserData>) {
			state.users.push(action.payload)
		}
	},
	extraReducers: builder => {
		builder.addCase(userQuery.fulfilled, (state: any, action) => {
			// state = [{ name: 1, id: 1 }]
			state.users = action.payload
			console.log(state.users)
		})
	}
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
