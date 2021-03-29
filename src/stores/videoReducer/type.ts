export type initVideoPlayerStateType = {
	muted: boolean;
	playing: boolean;
	volume: number;
	playbackRate: string;
	changeState: ProgressState;
	seeking: boolean;
};

export type ProgressState = {
	loaded: number;
	loadedSeconds: number;
	played: number;
	playedSeconds: number;
};
