export type VideoPlayerStateType = {
	muted: boolean;
	playing: boolean;
	volume: number;
	playbackRate: string;
	seeking?: boolean;
	loop?: boolean;
	duration?: number;
	played: number;
	pip?: boolean;
	controls?: boolean;
	light?: boolean;
};

export type ProgressState = {
	loaded: number;
	loadedSeconds: number;
	played: number;
	playedSeconds: number;
};
