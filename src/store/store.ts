import { configureStore } from '@reduxjs/toolkit'

import AuthorisReducer from './authorizeSlice'
import SerialsReducer from './serialsSlice'
import UsersReducer from './usersSlice'

export const store = configureStore({
	reducer: {
		serials: SerialsReducer,
		users: UsersReducer,
		authoriz: AuthorisReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
