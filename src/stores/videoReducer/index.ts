import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initVideoPlayerState } from './init';
import { ProgressState } from './type';

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
		setPlaybackRate(state, action: PayloadAction<{ playbackRate: string }>) {
			state.playbackRate = action.payload.playbackRate;
		},
		setProgress(state, action: PayloadAction<{ changeState: ProgressState }>) {
			state.changeState = action.payload.changeState;
		},
	},
});

export const {
	setMuted,
	setPlaying,
	setVolume,
	setPlaybackRate,
	setProgress,
} = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
