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

const PlayerControl = forwardRef<HTMLDivElement, PlayerControlPropsType>(
	(props, ref) => {
		const {
			playing,
			muted,
			onPlaying,
			onFastForward,
			onRewind,
			onMute,
			onVolumeSliderMouseUp,
			onVolumeSliderMouseDown,
			onVideoSliderMouseUp,
			onVideoSliderMouseDown,
			volume,
			playbackRate,
			onPlaybackRateChange,
			onToggleFullScreen,
			played,
			onChangeDisplayFormat,
			elapsedTime,
			totalDuration,
		} = props;

		const { Option } = Select;

		const TopControl = () => (
			<Row justify="space-between" style={{ padding: 16 }}>
				<Col>
					<h4 style={{ color: 'white' }}>Video Title</h4>
				</Col>
				<Col>
					<Button>Bookmark</Button>
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
						{playing ? (
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
							onMouseDownSlider={() => onVideoSliderMouseDown()}
							onMouseUpSlider={(e: any) => onVideoSliderMouseUp(e)}
						/>
					</Col>
				</Row>

				<Row justify="space-between" gutter={[0, 0]}>
					<Col span={10}>
						<Row justify="space-around">
							<Col>
								<div className="bottomIcons">
									{playing ? (
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
										onMouseUpSlider={(e: any) => onVolumeSliderMouseUp(e)}
										onMouseDownSlider={() => onVolumeSliderMouseDown()}
									/>
								</div>
							</Col>
							<Col>
								<Button
									type="text"
									style={{
										paddingLeft: '0rem',
										marginLeft: '0rem',
										color: ' #fff',
									}}
									onClick={() => onChangeDisplayFormat()}
								>
									{elapsedTime}/{totalDuration}
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
