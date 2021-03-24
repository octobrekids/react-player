import { createSlice } from "@reduxjs/toolkit";
import { initVideoPlayerState } from "./init";

const videoPlayerSlice = createSlice({
    name: 'videoPlayer',
    initialState: initVideoPlayerState,
    reducers: {}
})

export default videoPlayerSlice.reducer