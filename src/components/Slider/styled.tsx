import styled from 'styled-components';

export const PlayerSliderWrapper = styled.div`
	position: relative;

	input[type='range'] {
		-webkit-appearance: none;
		width: 100%;
		height: 0.5rem;
		border-radius: 5px;
		background: #d3d3d3;
		outline: none;
		opacity: 0.7;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}

	input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: #000;
		cursor: pointer;
	}

	input::-moz-range-thumb {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: #000;
		cursor: pointer;
	}

	input:hover {
		opacity: 1;
	}

	input[type='range']::-moz-range-progress {
		background-color: #d3d3d3;
	}

	input[type='range']::-moz-range-track {
		background-color: #000;
	}

	input[type='range']::-ms-fill-lower {
		background-color: #d3d3d3;
	}

	input[type='range']::-ms-fill-upper {
		background-color: #000;
	}
`;
