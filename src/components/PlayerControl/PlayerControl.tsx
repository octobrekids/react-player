import { Row, Col, Button, Slider, Select } from 'antd';
import React from 'react';
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

const PlayerControl: React.FC<PlayerControlPropsType> = (props) => {
	const {
		playing,
		muted,
		onPlaying,
		onFastForward,
		onRewind,
		onMute,
		onVolumeChange,
		volume,
		playbackRate,
		onPlaybackRateChange,
		onVolumeSeekDown,
		onToggleFullScreen,
		played,
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
					<Slider min={0} max={100} value={played * 100} />
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
									value={volume * 100}
									onChange={onVolumeSeekDown}
									onAfterChange={onVolumeChange}
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
							>
								05:05
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
			<div className="controlsWrapper">
				<TopControl />
				<MiddleControl />
				<BottomControl />
			</div>
		</div>
	);
};

export default PlayerControl;
