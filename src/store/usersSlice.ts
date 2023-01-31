import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../http'
import { fetchSerials } from './serialsSlice'
import { Authorize, User } from './types'

type InitialStateType = {
	users: User[]
	status: 'pending' | 'error' | 'success' | null
	errorMessage?: string
}

const initialState: InitialStateType = {
	users: [],
	status: null,
}

export const registerUser = createAsyncThunk(
	'users/registerUser',
	async (user: User, thunkAPI) => {
		const response = await axios.post('/registrate', {
			...user,
		})

		return response.data
	}
)

export const loginUser = createAsyncThunk(
	'users/loginUser',
	async (user: User, thunkAPI) => {
		const response = await axios.post('/login', {
			...user,
		})
		localStorage.setItem('token', response.data.accessToken)

		// @ts-ignore
		thunkAPI.dispatch(fetchSerials())
		return response.data
	}
)

export const getUsers = createAsyncThunk('users/getUsers', async (thunkAPI) => {
	const response = await axios.get('/users')

	return response.data
})

export const logout = createAsyncThunk('users/logout', async (_, thunkAPI) => {
	const response = await axios.post('/logout')
	localStorage.removeItem('token')
	debugger
	// @ts-ignore
	// thunkAPI.dispatch(fetchSerials())

	return response.data
})

export const UserSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(registerUser.rejected, (state) => {
			state.status = 'error'
		})
		builder.addCase(
			registerUser.fulfilled,
			(state, action: PayloadAction<Authorize>) => {
				state.status = 'success'
			}
		)
		builder.addCase(loginUser.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(loginUser.rejected, (state) => {
			state.status = 'error'
		})
		builder.addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<Authorize>) => {
				state.status = 'success'
				localStorage.setItem('token', action.payload.accessToken)
			}
		)
		builder.addCase(getUsers.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(getUsers.rejected, (state) => {
			state.status = 'error'
		})
		builder.addCase(
			getUsers.fulfilled,
			(state, action: PayloadAction<User[]>) => {
				state.status = 'success'
				state.users = action.payload
			}
		)
		builder.addCase(logout.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(logout.rejected, (state) => {
			state.status = 'error'
		})
		builder.addCase(logout.fulfilled, (state) => {
			state.status = 'success'
		})
	},
})

export default UserSlice.reducer
