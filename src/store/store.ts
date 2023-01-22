import { configureStore } from '@reduxjs/toolkit'
import SerialsReducer from './serialsSlice'

export const store = configureStore({
	reducer: {
		serials: SerialsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
