import { initVideoPlayerStateType } from './type';

export const initVideoPlayerState: initVideoPlayerStateType = {
	muted: false,
	playing: false,
	volume: 50 / 100,
	playbackRate: '1',
	seeking: false,
	loop: false,
	duration: 0,
	played: 0,
	pip: false,
	controls: false,
	light: false,
};
