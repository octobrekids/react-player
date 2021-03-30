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
		setVideoSliderMouseUp(state, action: PayloadAction<{ seeking: boolean }>) {
			state.seeking = action.payload.seeking;
		},
		setVideoSliderMouseDown(
			state,
			action: PayloadAction<{ seeking: boolean }>
		) {
			state.seeking = action.payload.seeking;
		},
		setVolumeSliderMouseUp(state, action: PayloadAction<{ seeking: boolean }>) {
			state.seeking = action.payload.seeking;
		},
		setVolumeSliderMouseDown(
			state,
			action: PayloadAction<{ seeking: boolean }>
		) {
			state.seeking = action.payload.seeking;
		},
		setVideoSliderChange(state, action: PayloadAction<{ played: number }>) {
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
	setVideoSliderMouseUp,
	setVideoSliderMouseDown,
	setVideoSliderChange,
	setVolumeSliderMouseUp,
	setVolumeSliderMouseDown,
} = videoPlayerSlice.actions;
export default videoPlayerSlice.reducer;
