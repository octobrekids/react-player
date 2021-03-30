import React, { useRef, useState } from 'react';
import './App.css';
import { Row, Col, Card } from 'antd';
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
	setVolumeSliderMouseDown,
	setVolumeSliderMouseUp,
} from './stores/videoReducer';
import { ProgressState } from './stores/videoReducer/type';
import { captureVideoFrame } from './utils/captureVideoFrame';
import { MarkersType } from './components/Marker/type';
import { markers } from './mocks/markers';

type BookmarkType = {
	time: number;
	display: string;
	image: string;
}[];

function App() {
	const dispatch = useDispatch();
	const playerRef = useRef<ReactPlayer>(null);
	const playerContainerRef = useRef<HTMLDivElement>(null);
	const controlsRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal');
	const [bookmarks, setBookmarks] = useState<BookmarkType>([]);

	const format = (seconds: number): string => {
		if (isNaN(seconds)) {
			return `00:00`;
		}
		const date = new Date(seconds * 1000);
		const hh = date.getUTCHours();
		const mm = date.getUTCMinutes();
		const ss = date.getUTCSeconds().toString().padStart(2, '0');
		if (hh) {
			return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
		}
		return `${mm}:${ss}`;
	};

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
		dispatch(setVolumeSliderMouseUp({ seeking: false }));
	};

	const handleVolumeSliderMouseDown = () => {
		dispatch(setVolumeSliderMouseDown({ seeking: true }));
	};

	const handlePlaybackRateChange = (value: string) => {
		dispatch(setPlaybackRate({ playbackRate: value }));
	};

	const handleToggleFullScreen = () => {
		if (screenful.isEnabled && playerContainerRef.current) {
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
		if (count > 3 && controlsRef.current) {
			controlsRef.current.style.visibility = 'hidden';
			count = 0;
		}
		if (
			controlsRef.current &&
			controlsRef.current.style.visibility === 'visible'
		) {
			count += 1;
		}
		if (!seeking) {
			dispatch(setProgress({ played: changeState.played }));
		}
	};

	const handleMouseMove = () => {
		if (!controlsRef.current) return;
		controlsRef.current.style.visibility = 'visible';
		count = 0;
	};

	const handleMouseLeave = () => {
		if (!controlsRef.current) return;
		controlsRef.current.style.visibility = 'hidden';
		count = 0;
	};

	const handleDisplayFormat = () => {
		setTimeDisplayFormat(
			timeDisplayFormat === 'normal' ? 'remaining' : 'normal'
		);
	};

	const addBookmark = () => {
		const canvas = canvasRef.current;
		if (canvas && playerRef.current) {
			canvas.width = 160;
			canvas.height = 90;

			const ctx = canvas.getContext('2d');

			if (ctx) {
				const video = playerRef.current.getInternalPlayer();
				captureVideoFrame(video, 'jpeg', 0.92, canvas);
			}

			const dataUri = canvas.toDataURL();
			canvas.width = 0;
			canvas.height = 0;

			const bookmarksCopy: BookmarkType = [...bookmarks];
			bookmarksCopy.push({
				time: playerRef.current.getCurrentTime(),
				display: format(playerRef.current.getCurrentTime()),
				image: dataUri,
			});
			setBookmarks(bookmarksCopy);
		}
	};

	const currentTime =
		playerRef && playerRef.current ? playerRef.current.getCurrentTime() : 0;

	const duration =
		playerRef && playerRef.current ? playerRef.current.getDuration() : 0;

	const elapsedTime =
		timeDisplayFormat === 'normal'
			? format(currentTime)
			: `-${format(duration - currentTime)}`;

	const totalDuration = format(duration);

	const handleMarkerClick = (marker: MarkersType) => {
		playerRef.current?.seekTo(marker.time);
	};

	return (
		<Row justify="center">
			<Col span={18}>
				<div
					ref={playerContainerRef}
					className="playerWrapper"
					onMouseMove={() => handleMouseMove()}
					onMouseLeave={() => handleMouseLeave()}
				>
					<ReactPlayer
						url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
						ref={playerRef}
						width="100%"
						height="100%"
						muted={muted}
						playing={playing}
						volume={volume}
						playbackRate={parseFloat(playbackRate)}
						onProgress={handleProgress}
						config={{
							file: {
								attributes: {
									crossOrigin: 'anonymous',
								},
							},
						}}
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
						onVolumeSliderMouseDown={handleVolumeSliderMouseDown}
						onChangeDisplayFormat={handleDisplayFormat}
						elapsedTime={elapsedTime}
						totalDuration={totalDuration}
						onBookmark={addBookmark}
						markers={markers}
						onMarkerClick={handleMarkerClick}
					/>
				</div>
				<Row style={{ marginTop: 20 }} justify="space-around">
					{bookmarks.map((bookmark) => (
						<Col span={4} style={{ marginLeft: 20, marginTop: 20 }}>
							<Card
								key={Math.random()}
								onClick={() => playerRef.current?.seekTo(bookmark.time)}
							>
								<img crossOrigin="anonymous" src={bookmark.image} alt="" />
								<p>Bookmark at {bookmark.display}</p>
							</Card>
						</Col>
					))}
				</Row>
				<canvas ref={canvasRef} />
			</Col>
		</Row>
	);
}

export default App;
