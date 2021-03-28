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
		setPlaybackRate(state, action: PayloadAction<{ playbackRate: number }>) {
			state.playbackRate = action.payload.playbackRate;
		},
	},
});

export const {
	setMuted,
	setPlaying,
	setVolume,
	setPlaybackRate,
} = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
