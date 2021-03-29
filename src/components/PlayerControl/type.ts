import { initVideoPlayerStateType } from '../../stores/videoReducer/type';

export type PlayerControlPropsType = Omit<
	initVideoPlayerStateType,
	'changeState' | 'seeking'
> & {
	onPlaying: () => void;
	onFastForward: () => void;
	onRewind: () => void;
	onMute: () => void;
	onVolumeChange: (value: number) => void;
	onPlaybackRateChange: (value: string) => void;
	onToggleFullScreen: () => void;
	onVolumeSeekDown: (value: number) => void;
	volumeOnChange: number;
	played: number;
};
