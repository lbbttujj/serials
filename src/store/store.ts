import { configureStore } from '@reduxjs/toolkit'
import SerialsReducer from './serialsSlice'

export const store = configureStore({
    reducer: {
        serials: SerialsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch