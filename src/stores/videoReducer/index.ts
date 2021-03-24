import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initVideoPlayerState } from "./init";

const videoPlayerSlice = createSlice({
    name: 'videoPlayer',
    initialState: initVideoPlayerState,
    reducers: {
        setMuted(state, action: PayloadAction<{muted: boolean}>) {
            state.muted =  !state.muted;
        },
        setPlaying(state, action: PayloadAction<{playing: boolean}>) {
            state.playing =  !action.payload.playing;
        },
    }
})

export const { setMuted, setPlaying }  = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer