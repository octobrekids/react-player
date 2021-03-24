import { combineReducers, configureStore } from '@reduxjs/toolkit'
import videoPlayerSlice from './videoReducer/index'

const rootReducer = combineReducers({
    videoPlayer: videoPlayerSlice,
})

export const store = configureStore({
  reducer: rootReducer
});

export type StoresState = ReturnType<typeof rootReducer>;