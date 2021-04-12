import React from 'react';
import { CanvasPropTypes } from './types';
import { Stage, Layer, Rect, Group, Text } from 'react-konva';

const Canvas: React.FC<CanvasPropTypes> = (props) => {
	const { width: canvasWidth, height: canvasHeight, played, incidents } = props;
	const layerItems: JSX.Element[] = [];

	const aspectRatio = canvasHeight / 1880;
	console.log('AspectRatio ' + aspectRatio);
	// eslint-disable-next-line array-callback-return
	incidents.map((incident, index) => {
		const { x, y, width, height, label } = incident;
		console.log(played, incident.startVisibleAt);
		if (
			played * 10 >= incident.startVisibleAt &&
			played * 10 < incident.startVisibleAt + 0.05
		) {
			const rect = (
				<Rect
					x={x * aspectRatio}
					y={y * aspectRatio}
					width={width * aspectRatio}
					height={height * aspectRatio}
					stroke={'red'}
					strokeWidth={1}
				/>
			);

			const labelText = (
				<Text
					offsetY={20 * aspectRatio}
					x={x * aspectRatio}
					y={y * aspectRatio}
					fontFamily="Arial"
					text={label}
					fontSize={16}
					lineHeight={1.2}
					fill="#000"
				/>
			);

			layerItems.push(
				<Group
					x={x * aspectRatio + 90}
					y={y * aspectRatio}
					key={index}
					name={label}
				>
					{labelText}
					{rect}
				</Group>
			);
		}
	});

	return (
		<Stage
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
			}}
			width={canvasWidth}
			height={canvasHeight}
		>
			<Layer>{layerItems}</Layer>
		</Stage>
	);
};

export default Canvas;
