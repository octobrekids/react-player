import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { CanvasPropTypes } from './types';

const Canvas: React.FC<CanvasPropTypes> = (props) => {
	const {
		dotLength,
		width,
		height,
		objects,
		played,
		focusing,
		isAdding,
		entities,
	} = props;
	const layerItem = [];
	return (
		<Stage>
			<Layer>
				<Rect
					x={20}
					y={50}
					width={100}
					height={100}
					fill="red"
					shadowBlur={10}
				/>
			</Layer>
		</Stage>
	);
};

export default Canvas;
