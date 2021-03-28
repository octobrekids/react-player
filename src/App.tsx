import React, { useRef } from 'react';
import './App.css';
import { Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import PlayerControl from './components/PlayerControl/PlayerControl';
import { useDispatch, useSelector } from 'react-redux';
import { StoresState } from './stores';
import {
	setMuted,
	setPlaybackRate,
	setPlaying,
	setVolume,
} from './stores/videoReducer';

function App() {
	const dispatch = useDispatch();

	const playerRef = useRef<ReactPlayer>(null);

	const playing = useSelector(
		(state: StoresState) => state.videoPlayer.playing
	);
	const muted = useSelector((state: StoresState) => state.videoPlayer.muted);
	const volume = useSelector((state: StoresState) => state.videoPlayer.volume);
	const playbackRate = useSelector(
		(state: StoresState) => state.videoPlayer.playbackRate
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

	const handleVolumeChange = (value: number) => {
		dispatch(
			setVolume({
				volume: value / 100,
				muted: value === 0 ? true : false,
			})
		);
	};

	const handleVolumeSeekDown = (value: number) => {
		dispatch(
			setVolume({
				volume: value / 100,
				muted: value === 0 ? true : false,
			})
		);
	};

	const handlePlaybackRateChange = (value: string) => {
		dispatch(setPlaybackRate({ playbackRate: value }));
	};

	return (
		<Row justify="center">
			<Col span={10}>
				<div className="playerWrapper">
					<ReactPlayer
						url="https://www.youtube.com/watch?v=gdZLi9oWNZg"
						ref={playerRef}
						width="100%"
						height="100%"
						muted={muted}
						playing={playing}
						volume={volume}
						playbackRate={parseFloat(playbackRate)}
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
						onVolumeSeekDown={handleVolumeSeekDown}
						onPlaybackRateChange={handlePlaybackRateChange}
						playbackRate={playbackRate}
					/>
				</div>
			</Col>
		</Row>
	);
}

export default App;
