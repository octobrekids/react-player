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
import { MarkerType } from './components/Marker/type';
import Canvas from './components/Canvas';
import { annotation } from './mocks/annotation';
import { VideoPlayerStateType } from './models/videoPlayer/type';
//import { markers } from './mocks/markers';

type BookmarkType = {
	time: number;
	display: string;
	image: string;
}[];

function App() {
	const playerRef = useRef<ReactPlayer>(null);
	const playerContainerRef = useRef<HTMLDivElement>(null);
	const controlsRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	let count = 0;
	let id = 0;

	const [videoState, setVideoState] = useState<VideoPlayerStateType>({
		muted: false,
		isPlaying: false,
		volume: 0,
		playbackRate: '1',
		seeking: false,
		loop: false,
		duration: 0,
		played: 0,
		pip: false,
		controls: false,
		light: false,
	});
	const [timeDisplayFormat, setTimeDisplayFormat] = useState('normal');
	const [bookmarks, setBookmarks] = useState<BookmarkType>([]);
	const [markers, setMarkers] = useState<MarkerType[]>([]);

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

	const handleVideoPlayPause = () => {
		setVideoState((prevState) => ({
			...prevState,
			isPlaying: !prevState.isPlaying,
		}));
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

	const handleVideoSliderMouseUp = () => {
		setVideoState((prevState) => ({ ...prevState, seeking: false }));
	};

	const handleVideoSliderMouseDown = () => {
		setVideoState((prevState) => ({
			...prevState,
			seeking: true,
			isPlaying: false,
		}));
	};

	const handleVideoSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const played = parseFloat(e.target.value);
		setVideoState((prevState) => ({ ...prevState, played: played / 100 }));
		if (playerRef.current) {
			playerRef.current.seekTo(played);
		}
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
			const markersCopy: MarkerType[] = [...markers];

			bookmarksCopy.push({
				time: playerRef.current.getCurrentTime(),
				display: format(playerRef.current.getCurrentTime()),
				image: dataUri,
			});

			markersCopy.push({
				id: id,
				time: playerRef.current.getCurrentTime(),
				color: '#ffc837',
				title: 'bunny',
			});
			id++;
			setMarkers(markersCopy);
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

	const handleMarkerClick = (marker: MarkerType) => {
		playerRef.current?.seekTo(marker.time);
		alert('marker clicked!');
	};

	let canvasWidth = 400;
	canvasWidth = controlsRef.current?.clientWidth
		? controlsRef.current?.clientWidth
		: canvasWidth;

	let canvasHeight = 400;
	canvasHeight = controlsRef.current?.clientHeight
		? controlsRef.current?.clientHeight
		: canvasHeight;

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
						muted={videoState.muted}
						playing={videoState.isPlaying}
						volume={videoState.volume}
						playbackRate={parseFloat(videoState.playbackRate)}
						onProgress={handleProgress}
						config={{
							file: {
								attributes: {
									crossOrigin: 'anonymous',
								},
							},
						}}
					/>

					<Canvas
						width={canvasWidth}
						height={canvasHeight}
						annotations={annotation}
						played={videoState.played}
					/>

					<PlayerControl
						ref={controlsRef}
						muted={videoState.muted}
						volume={videoState.volume}
						playing={videoState.isPlaying}
						onRewind={handleRewind}
						onFastForward={handleFastForward}
						onPlaying={handleVideoPlayPause}
						onMute={handleMute}
						onPlaybackRateChange={handlePlaybackRateChange}
						playbackRate={videoState.playbackRate}
						onToggleFullScreen={handleToggleFullScreen}
						onVolumeSliderMouseUp={handleVolumeSliderMouseUp}
						played={videoState.played}
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
						duration={duration}
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
