import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../slice/userSlice'
import listSlice from '../slice/listSlice'
export const store = configureStore({
	reducer: {
		users: userSlice,
		shop: listSlice
	}
})

export type StoreData = ReturnType<typeof store.getState>

export type StoreDispatch = typeof store.dispatch
