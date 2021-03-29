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
		setVolumeSeekDown(
			state,
			action: PayloadAction<{ seeking: boolean; volume: number }>
		) {
			state.seeking = action.payload.seeking;
			state.volume = action.payload.volume;
		},
		setPlaybackRate(state, action: PayloadAction<{ playbackRate: string }>) {
			state.playbackRate = action.payload.playbackRate;
		},
		setProgress(state, action: PayloadAction<{ played: number }>) {
			state.played = action.payload.played;
		},
	},
});

export const {
	setMuted,
	setPlaying,
	setVolume,
	setPlaybackRate,
	setProgress,
	setVolumeSeekDown,
} = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
