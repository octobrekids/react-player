import React, { useRef, useState } from 'react';
import './App.css';
import { Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import PlayerControl from './components/PlayerControl/PlayerControl';
import { useDispatch, useSelector } from 'react-redux';
import { StoresState } from './stores';
import screenful from 'screenfull';
import {
	setMuted,
	setPlaybackRate,
	setPlaying,
	setProgress,
	setVideoSliderChange,
	setVideoSliderMouseDown,
	setVideoSliderMouseUp,
	setVolume,
	setVolumeSeekDown,
} from './stores/videoReducer';
import { ProgressState } from './stores/videoReducer/type';

function App() {
	const dispatch = useDispatch();

	const playerRef = useRef<ReactPlayer>(null);
	const playerContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const controlsRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const canvasRef = useRef(null);

	let count = 0;

	const playing = useSelector(
		(state: StoresState) => state.videoPlayer.playing
	);
	const muted = useSelector((state: StoresState) => state.videoPlayer.muted);
	const volume = useSelector((state: StoresState) => state.videoPlayer.volume);
	const playbackRate = useSelector(
		(state: StoresState) => state.videoPlayer.playbackRate
	);
	const played = useSelector((state: StoresState) => state.videoPlayer.played);
	const seeking = useSelector(
		(state: StoresState) => state.videoPlayer.seeking
	);

	const handlePlaying = () => {
		dispatch(setPlaying());
	};

	const handleRewind = () => {
		if (playerRef.current) {
			playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
		}
	};

	const handleFastForward = () => {
		if (playerRef.current) {
			playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
		}
	};

	const handleMute = () => {
		dispatch(setMuted());
		if (muted !== false) {
			setVolume({ volume: 50 / 100, muted: false });
		}
	};

	const handleVolumeSliderMouseUp = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		dispatch(
			setVolumeSeekDown({
				seeking: false,
				volume: parseFloat(e.target.value) / 100,
			})
		);
	};

	const handlePlaybackRateChange = (value: string) => {
		dispatch(setPlaybackRate({ playbackRate: value }));
	};

	const handleToggleFullScreen = () => {
		if (screenful.isEnabled) {
			screenful.toggle(playerContainerRef.current);
		}
	};

	const handleVideoSliderMouseUp = (e: any) => {
		const played = parseFloat(e.target.value);
		dispatch(setVideoSliderChange({ played: played / 100 }));
		if (playerRef.current) {
			playerRef.current.seekTo(played / 100, 'fraction');
		}
		dispatch(setVideoSliderMouseUp({ seeking: false }));
	};

	const handleVideoSliderMouseDown = () => {
		dispatch(setVideoSliderMouseDown({ seeking: true }));
	};

	const handleVideoSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const played = parseFloat(e.target.value);
		dispatch(setVideoSliderChange({ played: played / 100 }));
	};

	const handleProgress = (changeState: ProgressState) => {
		if (count > 3) {
			controlsRef.current.style.visibility = 'hidden';
			count = 0;
		}
		if (controlsRef.current.style.visibility === 'visible') {
			count += 1;
		}
		if (!seeking) {
			dispatch(setProgress({ played: changeState.played }));
		}
	};

	return (
		<Row justify="center">
			<Col span={10}>
				<div ref={playerContainerRef} className="playerWrapper">
					<ReactPlayer
						url="https://www.youtube.com/watch?v=RSf8QcJkGuk"
						ref={playerRef}
						width="100%"
						height="100%"
						muted={muted}
						playing={playing}
						volume={volume}
						playbackRate={parseFloat(playbackRate)}
						onProgress={handleProgress}
					/>
					<PlayerControl
						ref={controlsRef}
						muted={muted}
						volume={volume}
						playing={playing}
						onRewind={handleRewind}
						onFastForward={handleFastForward}
						onPlaying={handlePlaying}
						onMute={handleMute}
						onPlaybackRateChange={handlePlaybackRateChange}
						playbackRate={playbackRate}
						onToggleFullScreen={handleToggleFullScreen}
						onVolumeSliderMouseUp={handleVolumeSliderMouseUp}
						played={played}
						onVideoSliderChange={handleVideoSliderChange}
						onVideoSliderMouseUp={handleVideoSliderMouseUp}
						onVideoSliderMouseDown={handleVideoSliderMouseDown}
					/>
				</div>
			</Col>
		</Row>
	);
}

export default App;
