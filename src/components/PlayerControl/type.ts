import { initVideoPlayerStateType } from '../../stores/videoReducer/type';

export type PlayerControlPropsType = initVideoPlayerStateType & {
	onPlaying: () => void;
	onFastForward: () => void;
	onRewind: () => void;
	onMute: () => void;
	onVolumeChange: (value: number) => void;
	onPlaybackRateChange: (value: string) => void;
	onToggleFullScreen: () => void;
};
