import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initVideoPlayerState } from "./init";

const videoPlayerSlice = createSlice({
    name: "videoPlayer",
    initialState: initVideoPlayerState,
    reducers: {
        setMuted(state) {
            state.muted = !state.muted;
        },
        setPlaying(state) {
            state.playing = !state.playing;
        }
    }
});

export const { setMuted, setPlaying } = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
