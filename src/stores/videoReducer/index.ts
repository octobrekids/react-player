import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initVideoPlayerState } from './init';

const videoPlayerSlice = createSlice({
	name: 'videoPlayer',
	initialState: initVideoPlayerState,
	reducers: {
		setMuted(state) {
			state.muted = !state.muted;
		},
		setPlaying(state) {
			state.playing = !state.playing;
		},
		setVolume(
			state,
			action: PayloadAction<{ volume: number; muted: boolean }>
		) {
			state.volume = action.payload.volume;
			state.muted = action.payload.muted;
		},
		setVolumeSeekDown(state, action: PayloadAction<{ volume: number }>) {
			state.seeking = false;
			state.volume = action.payload.volume;
		},
	},
});

export const {
	setMuted,
	setPlaying,
	setVolume,
	setVolumeSeekDown,
} = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
