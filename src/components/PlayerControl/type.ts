import { ChangeEvent } from 'react';
import { initVideoPlayerStateType } from '../../stores/videoReducer/type';

export type PlayerControlPropsType = initVideoPlayerStateType & {
	onPlaying: () => void;
	onFastForward: () => void;
	onRewind: () => void;
	onMute: () => void;
	onPlaybackRateChange: (value: string) => void;
	onToggleFullScreen: () => void;
	onVolumeSliderMouseUp: (e: ChangeEvent<HTMLInputElement>) => void;
	onVideoSliderChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onVideoSliderMouseUp: () => void;
	onVideoSliderMouseDown: () => void;
};
