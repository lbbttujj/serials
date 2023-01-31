import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from '../http'
import { SerialCard } from './types'

type InitialStateType = {
	serials: SerialCard[]
	visibleSerial: SerialCard[]
	status: 'pending' | 'error' | 'success' | null
	errorMessage?: string
}

const initialState: InitialStateType = {
	serials: [],
	visibleSerial: [],
	status: null,
}

export const fetchSerials = createAsyncThunk(
	'serials/fetchSerials',
	async (thunkAPI) => {
		const response = await axios.get('/serials')
		console.log(response)

		return response.data
	}
)

export const deleteSeialById = createAsyncThunk(
	'serials/deleteSerial',
	async (id: string, thunkAPI) => {
		console.log(id)

		const response = await axios.post('http://localhost:3005/api/delete', {
			id,
		})
		thunkAPI.dispatch(fetchSerials())
		return response.data
	}
)

export const addSerial = createAsyncThunk(
	'serials/addSerial',
	async (serial: SerialCard, thunkAPI) => {
		const response = await axios.post('http://localhost:3005/api/add', {
			...serial,
		})

		thunkAPI.dispatch(fetchSerials())
		return response.data
	}
)

export const updateSerial = createAsyncThunk(
	'serials/updateSerial',
	async (serial: SerialCard, thunkAPI) => {
		const response = await axios.post('http://localhost:3005/api/update', {
			...serial,
		})

		thunkAPI.dispatch(fetchSerials())
		return response.data
	}
)

export const SerialSlice = createSlice({
	name: 'serials',
	initialState,
	reducers: {
		setVisibleSerials: (state, action: PayloadAction<SerialCard[]>) => {
			state.visibleSerial = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSerials.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(
			fetchSerials.fulfilled,
			(state, action: PayloadAction<SerialCard[]>) => {
				state.status = 'success'
				state.serials = action.payload
				state.visibleSerial = action.payload
			}
		)
		builder.addCase(fetchSerials.rejected, (state) => {
			state.status = 'error'
		})
		builder.addCase(deleteSeialById.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(deleteSeialById.fulfilled, (state) => {
			state.status = 'success'
		})
		builder.addCase(deleteSeialById.rejected, (state) => {
			state.status = 'error'
		})
		builder.addCase(addSerial.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(addSerial.fulfilled, (state) => {
			state.status = 'success'
		})
		builder.addCase(addSerial.rejected, (state) => {
			state.status = 'error'
		})
		builder.addCase(updateSerial.pending, (state) => {
			state.status = 'pending'
		})
		builder.addCase(updateSerial.fulfilled, (state) => {
			state.status = 'success'
		})
		builder.addCase(updateSerial.rejected, (state) => {
			state.status = 'error'
		})
	},
})
export const { setVisibleSerials } = SerialSlice.actions
export default SerialSlice.reducer
