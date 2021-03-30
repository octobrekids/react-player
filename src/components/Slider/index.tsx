import React from 'react';
import { PlayerSliderWrapper } from './styled';
import { SliderPropsType } from './types';

const Slider: React.FC<SliderPropsType> = (props) => {
	const {
		min,
		max,
		onMouseUpSlider,
		onMouseDownSlider,
		onChangeSlider,
		played,
	} = props;

	return (
		<PlayerSliderWrapper>
			<input
				type="range"
				min={min}
				max={max}
				step="any"
				defaultValue={played}
				onMouseUp={onMouseUpSlider}
				onMouseDown={onMouseDownSlider}
				onChange={onChangeSlider}
				onInput={onChangeSlider}
			/>
		</PlayerSliderWrapper>
	);
};

export default Slider;
