import { ChangeEvent } from 'react';
import { VideoPlayerStateType } from '../../models/videoPlayer/type';
import { MarkerType } from '../Marker/type';

export type PlayerControlPropsType = VideoPlayerStateType & {
	onPlaying: () => void;
	onFastForward: () => void;
	onRewind: () => void;
	onMute: () => void;
	onPlaybackRateChange: (value: string) => void;
	onToggleFullScreen: () => void;
	onVolumeSliderMouseUp: () => void;
	onVolumeSliderMouseDown: () => void;
	onVolumeSliderChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onVideoSliderChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onVideoSliderMouseUp: () => void;
	onVideoSliderMouseDown: () => void;
	onChangeDisplayFormat: () => void;
	elapsedTime: string;
	totalDuration: string;
	onBookmark: () => void;
	onMarkerClick: (marker: MarkerType) => void;
	markers?: MarkerType[];
	duration: number;
};
