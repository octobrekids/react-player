export type initVideoPlayerStateType = {
	muted: boolean;
	playing: boolean;
	volume: number;
	playbackRate: string;
	changeState: ProgressState;
};

export type ProgressState = {
	loaded: number;
	loadedSeconds: number;
	played: number;
	playedSeconds: number;
};
