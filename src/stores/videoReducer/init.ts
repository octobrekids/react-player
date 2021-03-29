import { initVideoPlayerStateType } from './type';

export const initVideoPlayerState: initVideoPlayerStateType = {
	muted: false,
	playing: false,
	volume: 50,
	playbackRate: '1',
	changeState: {
		loaded: 0,
		loadedSeconds: 0,
		played: 0,
		playedSeconds: 0,
	},
};
