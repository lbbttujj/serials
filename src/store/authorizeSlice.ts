import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type InitialStateType = {
	isLogIn: boolean
	userId: string
}

const initialState: InitialStateType = {
	isLogIn: false,
	userId: '',
}

const AuthorizeSlice = createSlice({
	name: 'authorize',
	initialState,
	reducers: {},
	extraReducers: {},
})

export default AuthorizeSlice.reducer
