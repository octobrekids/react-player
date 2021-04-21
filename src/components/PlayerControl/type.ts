import { ChangeEvent, MouseEventHandler } from 'react';
import { initVideoPlayerStateType } from '../../stores/videoReducer/type';
import { MarkerType } from '../Marker/type';

export type PlayerControlPropsType = initVideoPlayerStateType & {
	onPlaying: () => void;
	onFastForward: () => void;
	onRewind: () => void;
	onMute: () => void;
	onPlaybackRateChange: (value: string) => void;
	onToggleFullScreen: () => void;
	onVolumeSliderMouseUp: () => void;
	onVideoSliderChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onVideoSliderMouseUp: () => void;
	onVideoSliderMouseDown: () => void;
	onVolumeSliderMouseDown: () => void;
	onChangeDisplayFormat: () => void;
	elapsedTime: string;
	totalDuration: string;
	onBookmark: () => void;
	onMarkerClick: (marker: MarkerType) => void;
	markers?: MarkerType[];
	duration: number;
};
