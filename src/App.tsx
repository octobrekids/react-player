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
	setVolume,
	setVolumeSeekDown,
} from './stores/videoReducer';
import { ProgressState } from './stores/videoReducer/type';

function App() {
	const dispatch = useDispatch();

	const playerRef = useRef<ReactPlayer>(null);
	const playerContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

	const playing = useSelector(
		(state: StoresState) => state.videoPlayer.playing
	);
	const muted = useSelector((state: StoresState) => state.videoPlayer.muted);
	const volume = useSelector((state: StoresState) => state.videoPlayer.volume);
	const playbackRate = useSelector(
		(state: StoresState) => state.videoPlayer.playbackRate
	);
	const played = useSelector(
		(state: StoresState) => state.videoPlayer.changeState.played
	);

	const [volumeOnChange, setVolumeOnChange] = useState(50);

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

	const handleVolumeChange = (value: number) => {
		setVolumeOnChange(value);
		dispatch(
			setVolume({
				volume: volumeOnChange / 100,
				muted: volumeOnChange === 0 ? true : false,
			})
		);
	};

	const handleVolumeSeekDown = (value: number) => {
		dispatch(
			setVolumeSeekDown({
				seeking: false,
				volume: volumeOnChange / 100,
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

	const handleProgress = (changeState: ProgressState) => {
		dispatch(setProgress({ changeState: changeState }));
	};

	return (
		<Row justify="center">
			<Col span={10}>
				<div ref={playerContainerRef} className="playerWrapper">
					<ReactPlayer
						url="https://www.youtube.com/watch?v=vEd1rLfrOe4s"
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
						muted={muted}
						volume={volume}
						playing={playing}
						onRewind={handleRewind}
						onFastForward={handleFastForward}
						onPlaying={handlePlaying}
						onMute={handleMute}
						onVolumeChange={handleVolumeChange}
						onPlaybackRateChange={handlePlaybackRateChange}
						playbackRate={playbackRate}
						onToggleFullScreen={handleToggleFullScreen}
						onVolumeSeekDown={handleVolumeSeekDown}
						volumeOnChange={volumeOnChange}
						played={played}
					/>
				</div>
			</Col>
		</Row>
	);
}

export default App;
