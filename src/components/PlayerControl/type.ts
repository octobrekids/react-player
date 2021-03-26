import { initVideoPlayerStateType } from '../../stores/videoReducer/type';

export type PlayerControlPropsType = Omit<
	initVideoPlayerStateType,
	'volume'
> & {
	onPlaying: () => void;
	onFastForward: () => void;
	onRewind: () => void;
	onMute: () => void;
};
