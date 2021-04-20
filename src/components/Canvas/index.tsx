import React from 'react';
import { CanvasPropTypes } from './types';
import { Stage, Layer, Rect, Group, Text } from 'react-konva';
import {
	getInterpolatedData,
	INTERPOLATION_TYPE,
} from '../../utils/interpolationUtils';

const Canvas: React.FC<CanvasPropTypes> = (props) => {
	const {
		width: canvasWidth,
		height: canvasHeight,
		played,
		annotations,
	} = props;
	const layerItems: JSX.Element[] = [];

	const aspectRatio = canvasHeight / 1880;
	console.log('AspectRatio ' + aspectRatio);
	// eslint-disable-next-line array-callback-return
	annotations.map((annotation) => {
		const { label, incidents, id, startTime, endTime } = annotation;
		for (let i = 0; i < incidents.length; i++) {
			let x = 0;
			let y = 0;
			let width = 0;
			let height = 0;
			console.log(played + 'played');
			if (played >= startTime / 10 && played < endTime / 10) {
				if (
					i !== incidents.length - 1 &&
					played >= incidents[i + 1].time / 10
				) {
					continue;
				}
				if (i === incidents.length - 1) {
					({ x, y, width, height } = incidents[i]);
					console.log(x, y, width, height, incidents[i].time, played);
				} else {
					const interpoArea = getInterpolatedData({
						startIncident: incidents[i],
						endIncident: incidents[i + 1],
						currentTime: played,
						type: INTERPOLATION_TYPE.LENGTH,
					});
					const interpoPos = getInterpolatedData({
						startIncident: incidents[i],
						endIncident: incidents[i + 1],
						currentTime: played,
						type: INTERPOLATION_TYPE.POSITION,
					});
					({ x, y } = interpoPos);
					({ width, height } = interpoArea);
				}
			}

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
					//TODO: fix random key
					key={Math.random()}
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
