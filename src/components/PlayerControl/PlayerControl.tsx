import { Row, Col, Button, Slider, Dropdown, Menu } from 'antd';
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
		onVolumeSeekDown,
		volume,
	} = props;

	const menu = (
		<Menu>
			<Menu.Item>0.5</Menu.Item>
			<Menu.Item>1</Menu.Item>
			<Menu.Item>1.5</Menu.Item>
			<Menu.Item>2</Menu.Item>
		</Menu>
	);

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
					<Slider defaultValue={30} />
				</Col>
			</Row>

			<Row justify="space-between" gutter={[0, 0]}>
				<Col span={10}>
					<Row justify="space-around">
						<Col>
							<div className="bottomIcons">
								<CaretRightOutlined />
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
									value={muted ? 0 : volume * 100}
									onAfterChange={(value: number) => onVolumeSeekDown(value)}
									onChange={(value: number) => onVolumeChange(value)}
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
							<Dropdown overlay={menu}>
								<Button
									type="text"
									className="bottomIcons"
									style={{ color: ' #fff' }}
								>
									1X
								</Button>
							</Dropdown>
						</Col>
						<Col>
							<div className="bottomIcons" style={{ paddingTop: '0.2rem' }}>
								<ExpandOutlined />
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
