import React, { ChangeEvent } from 'react';

export type SliderPropsType = {
	onMouseUpSlider?: React.MouseEventHandler<HTMLInputElement>;
	onMouseDownSlider?: React.MouseEventHandler<HTMLInputElement>;
	onChangeSlider?: (e: ChangeEvent<HTMLInputElement>) => void;
	played: number;
	min: number;
	max: number;
};
