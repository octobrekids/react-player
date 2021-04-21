import { Row, Col, Button, Select } from 'antd';
import React, { forwardRef } from 'react';
import {
	CaretRightOutlined,
	ExpandOutlined,
	ForwardOutlined,
	BackwardOutlined,
	SoundOutlined,
	PauseOutlined,
	NotificationOutlined,
} from '@ant-design/icons';
import { PlayerControlPropsType } from './type';
import Slider from '../Slider';
import Marker from '../Marker';

const PlayerControl = forwardRef<HTMLDivElement, PlayerControlPropsType>(
	(props, ref) => {
		const {
			isPlaying,
			muted,
			onPlaying,
			onFastForward,
			onRewind,
			onMute,
			onVolumeSliderMouseUp,
			onVolumeSliderMouseDown,
			onVideoSliderMouseUp,
			onVideoSliderMouseDown,
			onVideoSliderChange,
			volume,
			playbackRate,
			onPlaybackRateChange,
			onToggleFullScreen,
			played,
			onChangeDisplayFormat,
			elapsedTime,
			totalDuration,
			onBookmark,
			markers,
			onMarkerClick,
			duration,
		} = props;

		const { Option } = Select;

		const TopControl = () => (
			<Row justify="space-between" style={{ padding: 16 }}>
				<Col>
					<h4 style={{ color: 'white' }}>Video Title</h4>
				</Col>
				<Col>
					<Button onClick={() => onBookmark()}>Bookmark</Button>
				</Col>
			</Row>
		);

		const MiddleControl = () => (
			<Row justify="center">
				<Col>
					<div className="controlIcons">
						<BackwardOutlined onClick={() => onRewind()} />
					</div>
				</Col>
				<Col>
					<div className="controlIcons">
						{isPlaying ? (
							<PauseOutlined onClick={() => onPlaying()} />
						) : (
							<CaretRightOutlined onClick={() => onPlaying()} />
						)}
					</div>
				</Col>
				<Col>
					<div className="controlIcons">
						<ForwardOutlined onClick={() => onFastForward()} />
					</div>
				</Col>
			</Row>
		);

		const BottomControl = () => (
			<div style={{ padding: '1rem' }}>
				<Row justify="space-between" gutter={[0, 0]}>
					<Col span={24}>
						<Slider
							min={0}
							max={100}
							played={played * 100}
							onChangeSlider={(e: React.ChangeEvent<HTMLInputElement>) =>
								onVideoSliderChange(e)
							}
							onMouseDownSlider={() => onVideoSliderMouseDown()}
							onMouseUpSlider={() => onVideoSliderMouseUp()}
						/>
						{markers &&
							markers.map((marker, index) => {
								return (
									<Marker
										key={index}
										marker={marker}
										duration={duration}
										onMarkerClick={onMarkerClick}
									/>
								);
							})}
					</Col>
				</Row>

				<Row justify="space-between" gutter={[0, 0]}>
					<Col span={10}>
						<Row justify="space-around">
							<Col>
								<div className="bottomIcons">
									{isPlaying ? (
										<PauseOutlined onClick={() => onPlaying()} />
									) : (
										<CaretRightOutlined onClick={() => onPlaying()} />
									)}
								</div>
							</Col>
							<Col>
								<div className="bottomIcons">
									{muted ? (
										<NotificationOutlined onClick={() => onMute()} />
									) : (
										<SoundOutlined onClick={() => onMute()} />
									)}
								</div>
							</Col>
							<Col span={8}>
								<div className="volumeSlider">
									<Slider
										min={0}
										max={100}
										played={muted ? 0 : volume * 100}
										onMouseUpSlider={() => onVolumeSliderMouseUp()}
										onMouseDownSlider={() => onVolumeSliderMouseDown()}
									/>
								</div>
							</Col>
							<Col span={8}>
								<Button
									type="text"
									style={{
										padding: '0rem',
										margin: '0rem',
										color: ' #fff',
										background: 'none',
										border: 'none',
									}}
									onClick={() => onChangeDisplayFormat()}
								>
									{elapsedTime} / {totalDuration}
								</Button>
							</Col>
						</Row>
					</Col>

					<Col span={4}>
						<Row justify="space-around">
							<Col>
								<Select
									defaultValue="1X"
									bordered={false}
									onChange={(value: string) => onPlaybackRateChange(value)}
									value={playbackRate}
									style={{ color: 'white' }}
								>
									{['2.0', '1.5', '1', '0.75', '0.5'].map((e, i) => (
										<Option key={i} value={e}>
											{e + 'X'}
										</Option>
									))}
								</Select>
							</Col>
							<Col>
								<div className="bottomIcons" style={{ paddingTop: '0.2rem' }}>
									<ExpandOutlined onClick={() => onToggleFullScreen()} />
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);

		return (
			<div>
				<div className="controlsWrapper" ref={ref}>
					<TopControl />
					<MiddleControl />
					<BottomControl />
				</div>
			</div>
		);
	}
);

export default PlayerControl;
